import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
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

function checkPasswordRules(password: string) {
	return {
		minLength: password.length >= 8,
		upperLower: /(?=.*[a-z])(?=.*[A-Z])/.test(password),
		hasNumber: /\d/.test(password),
		hasSpecial: /[^A-Za-z0-9]/.test(password),
	};
}

export default function ResetPasswordScreen() {
	const { email } = useLocalSearchParams<{ email?: string }>();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const rules = useMemo(() => checkPasswordRules(password), [password]);
	const isRulePassed = Object.values(rules).every(Boolean);
	const isConfirmMatched =
		confirmPassword.length > 0 && password === confirmPassword;
	const isSubmitDisabled = !isRulePassed || !isConfirmMatched;

	const handleSubmit = () => {
		if (isSubmitDisabled) return;

		Alert.alert("Thành công", "Đặt lại mật khẩu thành công", [
			{
				text: "OK",
				onPress: () => router.replace("/(auth)/login"),
			},
		]);
	};

	const renderRule = (isPassed: boolean, label: string) => (
		<View style={styles.ruleRow}>
			<Ionicons
				name={isPassed ? "checkmark-circle" : "ellipse-outline"}
				size={14}
				color={
					isPassed ? AUTH_UI.colors.success : AUTH_UI.colors.textMuted
				}
			/>
			<Text style={[styles.ruleText, isPassed && styles.ruleTextPassed]}>
				{label}
			</Text>
		</View>
	);

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

				<Text style={styles.title}>Tạo mật khẩu mới</Text>
				<Text style={styles.subtitle}>
					Nhập mật khẩu mới cho{" "}
					{typeof email === "string" ? email : "tài khoản của bạn"}
				</Text>

				<View style={styles.inputRow}>
					<TextInput
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						secureTextEntry={!showPassword}
						placeholder="Mật khẩu mới"
						placeholderTextColor={AUTH_UI.colors.textMuted}
					/>
					<TouchableOpacity
						onPress={() => setShowPassword((prev) => !prev)}>
						<Ionicons
							name={
								showPassword ? "eye-off-outline" : "eye-outline"
							}
							size={18}
							color={AUTH_UI.colors.textMuted}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.inputRow}>
					<TextInput
						style={styles.input}
						value={confirmPassword}
						onChangeText={setConfirmPassword}
						secureTextEntry={!showConfirmPassword}
						placeholder="Xác nhận mật khẩu"
						placeholderTextColor={AUTH_UI.colors.textMuted}
					/>
					<TouchableOpacity
						onPress={() => setShowConfirmPassword((prev) => !prev)}>
						<Ionicons
							name={
								showConfirmPassword
									? "eye-off-outline"
									: "eye-outline"
							}
							size={18}
							color={AUTH_UI.colors.textMuted}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.rulesBox}>
					{renderRule(rules.minLength, "Ít nhất 8 ký tự")}
					{renderRule(rules.upperLower, "Có chữ hoa và chữ thường")}
					{renderRule(rules.hasNumber, "Có ít nhất 1 chữ số")}
					{renderRule(
						rules.hasSpecial,
						"Có ít nhất 1 ký tự đặc biệt",
					)}
					{renderRule(isConfirmMatched, "Mật khẩu xác nhận khớp")}
				</View>

				<TouchableOpacity
					style={[
						styles.primaryButton,
						isSubmitDisabled && styles.primaryButtonDisabled,
					]}
					onPress={handleSubmit}
					disabled={isSubmitDisabled}>
					<Text style={styles.primaryButtonText}>
						Đặt lại mật khẩu
					</Text>
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
		marginBottom: 16,
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
		marginBottom: 10,
	},
	input: {
		flex: 1,
		color: AUTH_UI.colors.textPrimary,
		fontSize: 15,
	},
	rulesBox: {
		borderRadius: AUTH_UI.radius.lg,
		borderWidth: 1,
		borderColor: AUTH_UI.colors.border,
		backgroundColor: AUTH_UI.colors.surface,
		paddingVertical: 10,
		paddingHorizontal: 12,
		marginBottom: 14,
	},
	ruleRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	ruleText: {
		color: AUTH_UI.colors.textMuted,
		fontSize: 12,
		marginLeft: 8,
	},
	ruleTextPassed: {
		color: AUTH_UI.colors.success,
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
