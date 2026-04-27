import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { AUTH_LAYOUT, AUTH_UI } from "@/constants/auth-ui";

const OTP_LENGTH = 6;
const OTP_SECONDS = 60;

export default function VerifyOtpScreen() {
	const { email } = useLocalSearchParams<{ email?: string }>();
	const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
	const [secondsLeft, setSecondsLeft] = useState(OTP_SECONDS);
	const refs = useRef<Array<TextInput | null>>([]);

	useEffect(() => {
		if (secondsLeft <= 0) return;

		const timer = setInterval(() => {
			setSecondsLeft((prev) => (prev <= 1 ? 0 : prev - 1));
		}, 1000);

		return () => clearInterval(timer);
	}, [secondsLeft]);

	const otpCode = otp.join("");
	const isSubmitDisabled = otpCode.length < OTP_LENGTH;

	const resendLabel = useMemo(() => {
		if (secondsLeft === 0) return "Gửi lại";
		return `Gửi lại sau ${secondsLeft}s`;
	}, [secondsLeft]);

	const handleChange = (value: string, index: number) => {
		const digit = value.replace(/\D/g, "").slice(-1);
		const next = [...otp];
		next[index] = digit;
		setOtp(next);

		if (digit && index < OTP_LENGTH - 1) {
			refs.current[index + 1]?.focus();
		}
	};

	const handleKeyPress = (key: string, index: number) => {
		if (key === "Backspace" && !otp[index] && index > 0) {
			refs.current[index - 1]?.focus();
		}
	};

	const handleResend = () => {
		if (secondsLeft > 0) return;
		setOtp(Array(OTP_LENGTH).fill(""));
		setSecondsLeft(OTP_SECONDS);
		refs.current[0]?.focus();
	};

	const handleConfirm = () => {
		if (isSubmitDisabled) return;

		router.push({
			pathname: "/(auth)/reset-password",
			params: { email: typeof email === "string" ? email : "" },
		});
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<View style={styles.content}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => router.back()}>
					<Ionicons
						name="arrow-back"
						size={18}
						color={AUTH_UI.colors.textPrimary}
					/>
				</TouchableOpacity>

				<Text style={styles.title}>Quên mật khẩu</Text>
				<Text style={styles.subtitle}>
					Mã đã gửi đến{" "}
					{typeof email === "string" ? email : "email của bạn"}
				</Text>

				<Text style={styles.instruction}>
					Nhập mã OTP 6 số từ email của bạn
				</Text>

				<View style={styles.otpRow}>
					{otp.map((digit, index) => (
						<TextInput
							key={index}
							ref={(el) => {
								refs.current[index] = el;
							}}
							style={styles.otpInput}
							value={digit}
							keyboardType="number-pad"
							maxLength={1}
							onChangeText={(val) => handleChange(val, index)}
							onKeyPress={({ nativeEvent }) =>
								handleKeyPress(nativeEvent.key, index)
							}
							selectionColor={AUTH_UI.colors.accent}
						/>
					))}
				</View>

				<TouchableOpacity
					style={styles.resendButton}
					onPress={handleResend}
					disabled={secondsLeft > 0}>
					<Text
						style={[
							styles.resendText,
							secondsLeft > 0 && styles.resendTextDisabled,
						]}>
						{resendLabel}
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[
						styles.primaryButton,
						isSubmitDisabled && styles.primaryButtonDisabled,
					]}
					onPress={handleConfirm}
					disabled={isSubmitDisabled}>
					<Text style={styles.primaryButtonText}>Xác nhận</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: AUTH_UI.colors.background,
	},
	content: {
		flex: 1,
		paddingHorizontal: AUTH_LAYOUT.horizontalPadding,
		paddingTop: 56,
	},
	backButton: {
		width: 34,
		height: 34,
		borderRadius: 10,
		backgroundColor: AUTH_UI.colors.surface,
		borderWidth: 1,
		borderColor: AUTH_UI.colors.border,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	title: {
		color: AUTH_UI.colors.textPrimary,
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 4,
	},
	subtitle: {
		color: AUTH_UI.colors.textSecondary,
		fontSize: 12,
		marginBottom: 24,
	},
	instruction: {
		color: AUTH_UI.colors.textPrimary,
		fontSize: 14,
		marginBottom: 14,
	},
	otpRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 18,
	},
	otpInput: {
		width: 44,
		height: 50,
		borderRadius: AUTH_UI.radius.lg,
		borderWidth: 1,
		borderColor: AUTH_UI.colors.border,
		backgroundColor: AUTH_UI.colors.surface,
		color: AUTH_UI.colors.textPrimary,
		fontSize: 20,
		fontWeight: "700",
		textAlign: "center",
	},
	resendButton: {
		alignItems: "center",
		marginBottom: 14,
	},
	resendText: {
		color: AUTH_UI.colors.accent,
		fontSize: 13,
		fontWeight: "600",
	},
	resendTextDisabled: {
		color: AUTH_UI.colors.textMuted,
	},
	primaryButton: {
		height: 50,
		borderRadius: AUTH_UI.radius.lg,
		backgroundColor: AUTH_UI.colors.accent,
		alignItems: "center",
		justifyContent: "center",
	},
	primaryButtonDisabled: {
		backgroundColor: AUTH_UI.colors.disabled,
	},
	primaryButtonText: {
		color: AUTH_UI.colors.accentText,
		fontSize: 15,
		fontWeight: "700",
	},
});
