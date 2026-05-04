import { Notification } from "@/models/notification.model";

export const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: "1",
		category: "[Lịch thi]",
		preview:
			"Bạn có lịch thi sa hình vào ngày 20/05\n🕐 08:00 - Sân thi Quận 9",
		detail:
			"[Lịch thi]\nBạn có lịch thi sa hình\n\n📅 Ngày: 20/05/2026\n🕐 Thời gian: 08:00\n📍 Địa điểm: Sân thi Quận 9\n\n📌 Lưu ý:\n- Có mặt trước 30 phút\n- Mang CCCD",
		timeAgo: "2 giờ trước",
		isRead: false,
	},
	{
		id: "2",
		category: "[Cảnh báo]",
		preview:
			"Bạn đã nghỉ quá 3 buổi liên tiếp\nVui lòng liên hệ trung tâm",
		detail:
			"[Cảnh báo]\nBạn đã nghỉ quá 3 buổi liên tiếp\n\n⚠️ Theo quy định, học viên vắng quá 3 buổi liên tiếp cần liên hệ trung tâm để xử lý.\n\n📞 Hotline: 1900 xxxx\n🕐 Giờ làm việc: 7:30 - 17:00",
		timeAgo: "2 giờ trước",
		isRead: true,
	},
	{
		id: "3",
		category: "[Lịch thi]",
		preview:
			"Bạn có lịch thi lý thuyết vào ngày 15/05\n🕐 09:00 - Phòng thi số 3",
		detail:
			"[Lịch thi]\nBạn có lịch thi lý thuyết\n\n📅 Ngày: 15/05/2026\n🕐 Thời gian: 09:00\n📍 Địa điểm: Phòng thi số 3 - Trung tâm đăng kiểm\n\n📌 Lưu ý:\n- Có mặt trước 30 phút\n- Mang CCCD và giấy phép học lái xe",
		timeAgo: "1 ngày trước",
		isRead: false,
	},
	{
		id: "4",
		category: "[Thông báo]",
		preview: "Lịch học tuần tới có thay đổi\nBuổi sáng thứ 3 dời sang thứ 4",
		detail:
			"[Thông báo]\nLịch học tuần tới có thay đổi\n\n📅 Buổi sáng thứ 3 (13/05) dời sang thứ 4 (14/05)\n🕐 Thời gian: 07:30 - 11:30\n📍 Địa điểm: Sân tập A\n\nXin lỗi vì sự bất tiện này.",
		timeAgo: "2 ngày trước",
		isRead: true,
	},
	{
		id: "5",
		category: "[Cảnh báo]",
		preview: "Học phí tháng 5 chưa được thanh toán\nHạn cuối: 10/05/2026",
		detail:
			"[Cảnh báo]\nHọc phí tháng 5 chưa được thanh toán\n\n💰 Số tiền: 1.500.000 VNĐ\n📅 Hạn cuối: 10/05/2026\n\n📌 Vui lòng thanh toán đúng hạn để tránh ảnh hưởng đến lịch học.\n\n📞 Liên hệ: 1900 xxxx",
		timeAgo: "3 ngày trước",
		isRead: false,
	},
];
