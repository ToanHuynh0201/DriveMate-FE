import { ScreenWrapper } from "@/components/screen-wrapper";
import { Button } from "@/components/common/Button";
import { Divider } from "@/components/common/Divider";
import { InfoRow } from "@/components/profile/InfoRow";
import { MenuRow } from "@/components/profile/MenuRow";
import { StatCard } from "@/components/profile/StatCard";
import { ToggleRow } from "@/components/profile/ToggleRow";
import { AUTH_UI } from "@/constants/auth-ui";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Me() {
	const [notif, setNotif] = useState(true);
	const [darkMode, setDarkMode] = useState(true);
	const { logout } = useAuthStore();
	const router = useRouter();

	const handleLogout = async () => {
		await logout();
		router.replace("/(auth)/login");
	};

	return (
		<ScreenWrapper
			backgroundColor={AUTH_UI.colors.background}
			scroll={true}
			edges={["top", "bottom"]}>
			<View style={styles.container}>
				<View style={styles.headerCard}>
					<View style={styles.headerLeft}>
						<View style={styles.avatar}>
							<Text style={styles.avatarText}>NA</Text>
						</View>
						<View style={styles.headerInfo}>
							<Text style={styles.fullName}>Nguyễn Văn An</Text>
							<Text style={styles.email}>nguyenvanan@email.com</Text>
						</View>
					</View>

					<View style={styles.badgesRow}>
						<View style={styles.badgePrimary}>
							<Text style={styles.badgePrimaryText}>Hạng B1</Text>
						</View>
						<View style={styles.badgePill}>
							<Text style={styles.badgePillText}>Đang học</Text>
						</View>
					</View>
				</View>

				<View style={styles.infoCard}>
					<InfoRow icon="call-outline" label="Số điện thoại" value="0901 234 567" />
					<Divider />
					<InfoRow icon="calendar-outline" label="Ngày sinh" value="15/03/1998" />
					<Divider />
					<InfoRow icon="mail-outline" label="Email" value="nguyenvanan@email.com" />
				</View>

				<View style={styles.statsRow}>
					<StatCard label="Ngày học" value="42" />
					<StatCard label="Bài thi" value="34" />
					<StatCard label="Điểm TB" value="87%" color={AUTH_UI.colors.success} />
				</View>

				<Text style={styles.sectionTitle}>Tài khoản</Text>
				<View style={styles.sectionCard}>
					<ToggleRow
						icon="notifications-outline"
						label="Thông báo"
						value={notif}
						onChange={setNotif}
					/>
					<Divider />
					<ToggleRow
						icon="moon-outline"
						label="Chế độ tối"
						value={darkMode}
						onChange={setDarkMode}
					/>
					<Divider />
					<MenuRow icon="globe-outline" label="Ngôn ngữ" value="Tiếng Việt" />
				</View>

				<Text style={styles.sectionTitle}>Khóa học</Text>
				<View style={styles.sectionCard}>
					<MenuRow icon="ribbon-outline" label="Hạng bằng đang học" value="B1" />
					<Divider />
					<MenuRow icon="star-outline" label="Đánh giá ứng dụng" />
				</View>

				<Text style={styles.sectionTitle}>Hỗ trợ</Text>
				<View style={styles.sectionCard}>
					<MenuRow icon="help-circle-outline" label="Trung tâm hỗ trợ" />
					<Divider />
					<MenuRow icon="lock-closed-outline" label="Chính sách bảo mật" />
					<Divider />
					<MenuRow icon="document-text-outline" label="Điều khoản sử dụng" />
				</View>

				<Text style={styles.versionText}>LXePro v1.0.0 • Build 2026.04</Text>

				<Button
					variant="danger"
					icon="log-out-outline"
					label="Đăng xuất"
					style={styles.logoutBtn}
					onPress={handleLogout}
				/>
			</View>
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, paddingBottom: 32, gap: 12 },

	headerCard: {
		backgroundColor: AUTH_UI.colors.surface,
		borderRadius: AUTH_UI.radius.xl,
		padding: 16,
	},
	headerLeft: { flexDirection: "row", alignItems: "center" },
	headerInfo: { marginLeft: 12, flex: 1 },
	avatar: {
		width: 64,
		height: 64,
		borderRadius: 16,
		backgroundColor: AUTH_UI.colors.accent,
		alignItems: "center",
		justifyContent: "center",
	},
	avatarText: {
		color: AUTH_UI.colors.accentText,
		fontWeight: "800",
		fontSize: 20,
	},
	fullName: {
		color: AUTH_UI.colors.textPrimary,
		fontWeight: "800",
		fontSize: 16,
	},
	email: { color: AUTH_UI.colors.textSecondary, marginTop: 4, fontSize: 12 },
	badgesRow: { flexDirection: "row", gap: 8, marginTop: 12 },
	badgePrimary: {
		backgroundColor: AUTH_UI.colors.accent,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 12,
	},
	badgePrimaryText: { color: AUTH_UI.colors.accentText, fontWeight: "700" },
	badgePill: {
		backgroundColor: "rgba(83, 209, 141, 0.15)",
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 12,
	},
	badgePillText: { color: AUTH_UI.colors.success },

	infoCard: {
		backgroundColor: AUTH_UI.colors.surface,
		borderRadius: AUTH_UI.radius.lg,
		padding: 12,
	},
	statsRow: { flexDirection: "row", gap: 8, marginTop: 6 },
	sectionTitle: {
		textTransform: "uppercase",
		fontSize: 11,
		color: AUTH_UI.colors.textMuted,
		letterSpacing: 0.8,
		fontWeight: "600",
		marginTop: 8,
		marginBottom: 6,
	},
	sectionCard: {
		backgroundColor: AUTH_UI.colors.surface,
		borderRadius: AUTH_UI.radius.lg,
		padding: 8,
	},
	versionText: {
		color: AUTH_UI.colors.textMuted,
		fontSize: 11,
		textAlign: "center",
		marginTop: 8,
	},
	logoutBtn: {
		marginTop: 16,
	},
});
