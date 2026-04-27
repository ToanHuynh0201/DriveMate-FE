import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
	Alert,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { AUTH_LAYOUT, AUTH_UI } from "@/constants/auth-ui";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen() {
	const [email, setEmail] = useState("");

	const emailError = useMemo(() => {
		if (!email) return "";
		return EMAIL_REGEX.test(email.trim()) ? "" : "Email không hợp lệ";
	}, [email]);

	const isDisabled = !email.trim() || !!emailError;

	const handleSendOtp = () => {
		if (isDisabled) {
			Alert.alert("Thông báo", "Vui lòng nhập email hợp lệ");
			return;
		}

		router.push({
			pathname: "/(auth)/verify-otp",
			params: { email: email.trim() },
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
				<Text style={styles.subtitle}>Nhập email để nhận mã OTP</Text>

				<View style={styles.inputRow}>
					<Ionicons
						name="mail-outline"
						size={18}
						color={AUTH_UI.colors.textMuted}
					/>
					<TextInput
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						autoCapitalize="none"
						keyboardType="email-address"
						placeholder="Email của bạn"
						placeholderTextColor={AUTH_UI.colors.textMuted}
					/>
				</View>

				{!!emailError && (
					<Text style={styles.errorText}>{emailError}</Text>
				)}

				<TouchableOpacity
					style={[
						styles.primaryButton,
						isDisabled && styles.primaryButtonDisabled,
					]}
					onPress={handleSendOtp}
					disabled={isDisabled}>
					<Text style={styles.primaryButtonText}>Gửi mã OTP</Text>
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
		marginBottom: 6,
	},
	subtitle: {
		color: AUTH_UI.colors.textSecondary,
		fontSize: 13,
		marginBottom: 18,
	},
	inputRow: {
		height: 50,
		borderRadius: AUTH_UI.radius.lg,
		borderWidth: 1,
		borderColor: AUTH_UI.colors.border,
		backgroundColor: AUTH_UI.colors.surface,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 14,
		marginBottom: 8,
	},
	input: {
		flex: 1,
		color: AUTH_UI.colors.textPrimary,
		fontSize: 15,
		marginLeft: 10,
	},
	errorText: {
		color: AUTH_UI.colors.danger,
		fontSize: 12,
		marginBottom: 10,
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
