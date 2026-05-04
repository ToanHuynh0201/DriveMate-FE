import { AUTH_UI } from "@/constants/auth-ui";
import { useNotificationsStore } from "@/store/notifications.store";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type FilterTab = "all" | "read" | "unread";

const TABS: { key: FilterTab; label: string }[] = [
	{ key: "all", label: "Tất cả" },
	{ key: "read", label: "Đã đọc" },
	{ key: "unread", label: "Chưa đọc" },
];

export default function NotificationDetailScreen() {
	const router = useRouter();
	const { id } = useLocalSearchParams<{ id: string }>();
	const { notifications, markAsRead, refresh } = useNotificationsStore();
	const [activeTab, setActiveTab] = useState<FilterTab>("all");

	const notification = useMemo(
		() => notifications.find((n) => n.id === id),
		[notifications, id],
	);

	const unreadCount = useMemo(
		() => notifications.filter((n) => !n.isRead).length,
		[notifications],
	);

	useEffect(() => {
		if (id) markAsRead(id);
	}, [id]);

	if (!notification) {
		return (
			<SafeAreaView style={styles.screen}>
				<Text style={styles.notFound}>Không tìm thấy thông báo</Text>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.screen}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity
					style={styles.iconBtn}
					onPress={() => router.back()}>
					<Ionicons
						name="arrow-back"
						size={20}
						color={AUTH_UI.colors.textPrimary}
					/>
				</TouchableOpacity>
				<View style={styles.headerCenter}>
					<Text style={styles.headerTitle}>Chi tiết thông báo</Text>
					<Text style={styles.headerSubtitle}>
						{unreadCount} thông báo chưa đọc
					</Text>
				</View>
				<TouchableOpacity style={styles.iconBtn} onPress={refresh}>
					<Ionicons
						name="refresh-outline"
						size={20}
						color={AUTH_UI.colors.textPrimary}
					/>
				</TouchableOpacity>
			</View>

			{/* Filter tabs (decorative) */}
			<View style={styles.tabRow}>
				{TABS.map((tab) => (
					<TouchableOpacity
						key={tab.key}
						style={[
							styles.tab,
							activeTab === tab.key && styles.tabActive,
						]}
						onPress={() => setActiveTab(tab.key)}>
						<Text
							style={[
								styles.tabText,
								activeTab === tab.key && styles.tabTextActive,
							]}>
							{tab.label}
						</Text>
					</TouchableOpacity>
				))}
			</View>

			{/* Detail card */}
			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}>
				<View style={styles.card}>
					<Text style={styles.detail}>{notification.detail}</Text>
					<View style={styles.timeRow}>
						<View style={styles.dot} />
						<Text style={styles.timeAgo}>{notification.timeAgo}</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: { flex: 1, backgroundColor: AUTH_UI.colors.background },

	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		gap: 12,
	},
	iconBtn: {
		width: 40,
		height: 40,
		borderRadius: 12,
		backgroundColor: AUTH_UI.colors.surface,
		alignItems: "center",
		justifyContent: "center",
	},
	headerCenter: { flex: 1, alignItems: "center" },
	headerTitle: {
		color: AUTH_UI.colors.textPrimary,
		fontSize: 16,
		fontWeight: "700",
	},
	headerSubtitle: {
		color: AUTH_UI.colors.textMuted,
		fontSize: 12,
		marginTop: 2,
	},

	tabRow: {
		flexDirection: "row",
		paddingHorizontal: 16,
		gap: 8,
		marginBottom: 8,
	},
	tab: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: AUTH_UI.colors.surfaceMuted,
	},
	tabActive: { backgroundColor: AUTH_UI.colors.accent },
	tabText: {
		color: AUTH_UI.colors.textSecondary,
		fontSize: 13,
		fontWeight: "600",
	},
	tabTextActive: { color: AUTH_UI.colors.accentText },

	scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },

	card: {
		backgroundColor: AUTH_UI.colors.surface,
		borderRadius: AUTH_UI.radius.xl,
		padding: 20,
		gap: 16,
	},
	detail: {
		color: AUTH_UI.colors.textPrimary,
		fontSize: 14,
		lineHeight: 24,
	},

	timeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: AUTH_UI.colors.accent,
	},
	timeAgo: { color: AUTH_UI.colors.textMuted, fontSize: 12 },

	notFound: {
		textAlign: "center",
		color: AUTH_UI.colors.textMuted,
		marginTop: 40,
		fontSize: 14,
	},
});
