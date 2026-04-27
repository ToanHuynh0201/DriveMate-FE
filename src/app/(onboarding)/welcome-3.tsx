import { WelcomeScreen } from "@/components/onboarding/welcome-screen";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";

export default function WelcomeThreeScreen() {
	const router = useRouter();
	const completeOnboarding = useAuthStore(
		(state) => state.completeOnboarding,
	);

	const handleComplete = async () => {
		await completeOnboarding();
		router.replace("/(auth)/login");
	};

	return (
		<WelcomeScreen
			step={3}
			icon="🗺️"
			title="Sa hình & Thực hành ảo"
			description="Luyện sa hình 2D tương tác và thực hành lệnh đường trường với hướng dẫn âm thanh."
			buttonLabel="Bắt đầu ngay"
			backgroundColor="#0FB58F"
			bubbleColor="#64DBBE"
			onSkip={handleComplete}
			onNext={handleComplete}
		/>
	);
}
