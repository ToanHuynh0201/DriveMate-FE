import { MOCK_NOTIFICATIONS } from "@/data/notifications.mock";
import { Notification } from "@/models/notification.model";
import { create } from "zustand";

interface NotificationsState {
	notifications: Notification[];
}

interface NotificationsActions {
	markAsRead: (id: string) => void;
	refresh: () => void;
}

export const useNotificationsStore = create<
	NotificationsState & NotificationsActions
>((set) => ({
	notifications: MOCK_NOTIFICATIONS,

	markAsRead: (id) =>
		set((state) => ({
			notifications: state.notifications.map((n) =>
				n.id === id ? { ...n, isRead: true } : n,
			),
		})),

	refresh: () => set({ notifications: MOCK_NOTIFICATIONS }),
}));
