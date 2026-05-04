import { AUTH_UI } from "@/constants/auth-ui";
import { Notification } from "@/models/notification.model";
import { useNotificationsStore } from "@/store/notifications.store";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FilterTab = "all" | "read" | "unread";

const TABS: { key: FilterTab; label: string }[] = [
	{ key: "all", label: "Tất cả" },
	{ key: "read", label: "Đã đọc" },
	{ key: "unread", label: "Chưa đọc" },
];

export default function NotificationsScreen() {
	const router = useRouter();
	const { notifications, refresh } = useNotificationsStore();
	const [activeTab, setActiveTab] = useState<FilterTab>("all");

	const unreadCount = useMemo(
		() => notifications.filter((n) => !n.isRead).length,
		[notifications],
	);

	const filtered = useMemo(() => {
		if (activeTab === "read") return notifications.filter((n) => n.isRead);
		if (activeTab === "unread")
			return notifications.filter((n) => !n.isRead);
		return notifications;
	}, [notifications, activeTab]);

	function renderCard({ item }: { item: Notification }) {
		return (
			<TouchableOpacity
				style={styles.card}
				activeOpacity={0.75}
				onPress={() => router.push(`/notifications/${item.id}`)}>
				<View style={styles.cardTop}>
					<Text style={styles.category}>{item.category}</Text>
					<View
						style={[
							styles.badge,
							item.isRead ? styles.badgeRead : styles.badgeUnread,
						]}>
						<Text
							style={[
								styles.badgeText,
								item.isRead
									? styles.badgeTextRead
									: styles.badgeTextUnread,
							]}>
							{item.isRead ? "Đã đọc" : "Chưa đọc"}
						</Text>
					</View>
				</View>
				<Text
					style={styles.preview}
					numberOfLines={2}>
					{item.preview}
				</Text>
				<View style={styles.timeRow}>
					<View style={styles.dot} />
					<Text style={styles.timeAgo}>{item.timeAgo}</Text>
				</View>
			</TouchableOpacity>
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
					<Text style={styles.headerTitle}>Thông báo</Text>
					<Text style={styles.headerSubtitle}>
						{unreadCount} thông báo chưa đọc
					</Text>
				</View>
				<TouchableOpacity
					style={styles.iconBtn}
					onPress={refresh}>
					<Ionicons
						name="refresh-outline"
						size={20}
						color={AUTH_UI.colors.textPrimary}
					/>
				</TouchableOpacity>
			</View>

			{/* Filter tabs */}
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

			{/* List */}
			<FlatList
				data={filtered}
				keyExtractor={(item) => item.id}
				renderItem={renderCard}
				contentContainerStyle={styles.listContent}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={
					<Text style={styles.empty}>Không có thông báo</Text>
				}
			/>
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

	listContent: { paddingHorizontal: 16, paddingBottom: 32, gap: 12 },

	card: {
		backgroundColor: AUTH_UI.colors.surface,
		borderRadius: AUTH_UI.radius.xl,
		padding: 16,
		gap: 8,
	},
	cardTop: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	category: {
		color: AUTH_UI.colors.textPrimary,
		fontWeight: "700",
		fontSize: 14,
	},
	badge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 20,
	},
	badgeUnread: { backgroundColor: "rgba(243,201,66,0.2)" },
	badgeRead: { backgroundColor: "rgba(83,209,141,0.15)" },
	badgeText: { fontSize: 12, fontWeight: "600" },
	badgeTextUnread: { color: AUTH_UI.colors.accent },
	badgeTextRead: { color: AUTH_UI.colors.success },

	preview: {
		color: AUTH_UI.colors.textSecondary,
		fontSize: 13,
		lineHeight: 20,
	},

	timeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: AUTH_UI.colors.accent,
	},
	timeAgo: { color: AUTH_UI.colors.textMuted, fontSize: 12 },

	empty: {
		textAlign: "center",
		color: AUTH_UI.colors.textMuted,
		marginTop: 40,
		fontSize: 14,
	},
});
