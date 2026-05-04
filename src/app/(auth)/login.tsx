import { ScreenWrapper } from "@/components/screen-wrapper";
import { Button } from "@/components/common/Button";
import { InputField } from "@/components/common/InputField";
import { AUTH_LAYOUT, AUTH_UI } from "@/constants/auth-ui";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleLogin = async () => {
		router.replace("/(tabs)");
	};

	return (
		<ScreenWrapper
			backgroundColor={AUTH_UI.colors.background}
			keyboard
			edges={["top", "bottom"]}>
			<View style={styles.inner}>
				<View style={styles.logoWrapper}>
					<Ionicons
						name="key-outline"
						size={22}
						color={AUTH_UI.colors.accentText}
					/>
				</View>

				<Text style={styles.title}>Chào mừng trở lại</Text>
				<Text style={styles.subtitle}>Đăng nhập để tiếp tục học</Text>

				<InputField
					leftIcon="mail-outline"
					placeholder="Email của bạn"
					value={email}
					onChangeText={setEmail}
					autoCapitalize="none"
					keyboardType="email-address"
				/>

				<InputField
					leftIcon="lock-closed-outline"
					rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
					onRightPress={() => setShowPassword((p) => !p)}
					placeholder="Mật khẩu"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={!showPassword}
				/>

				<TouchableOpacity
					style={styles.forgotLink}
					onPress={() => router.push("/(auth)/forgot-password")}>
					<Text style={styles.forgotText}>Quên mật khẩu?</Text>
				</TouchableOpacity>

				<Button
					variant="primary"
					label="Đăng nhập"
					onPress={handleLogin}
					loading={loading}
					disabled={loading}
				/>

				<View style={styles.registerView}>
					<Text style={styles.linkText}>Chưa có tài khoản? </Text>
					<Link href="/(auth)/register" asChild>
						<TouchableOpacity>
							<Text style={[styles.linkText, styles.linkBold]}>
								Liên hệ admin nhé!
							</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	inner: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: AUTH_LAYOUT.horizontalPadding,
	},
	logoWrapper: {
		width: 48,
		height: 48,
		borderRadius: AUTH_UI.radius.xl,
		backgroundColor: AUTH_UI.colors.accent,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 18,
	},
	title: {
		fontSize: 30,
		fontWeight: "700",
		color: AUTH_UI.colors.textPrimary,
		marginBottom: 6,
	},
	subtitle: {
		fontSize: 14,
		color: AUTH_UI.colors.textSecondary,
		marginBottom: 26,
	},
	forgotLink: { alignSelf: "flex-end", marginBottom: 14, marginTop: -4 },
	forgotText: {
		fontSize: 12,
		color: AUTH_UI.colors.accent,
		fontWeight: "600",
	},
	registerView: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 2,
		marginTop: 16,
	},
	linkText: { fontSize: 13, color: AUTH_UI.colors.textSecondary },
	linkBold: { color: AUTH_UI.colors.accent, fontWeight: "600" },
});
