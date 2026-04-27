import { WelcomeScreen } from "@/components/onboarding/welcome-screen";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";

export default function WelcomeOneScreen() {
	const router = useRouter();
	const completeOnboarding = useAuthStore(
		(state) => state.completeOnboarding,
	);

	const handleSkip = async () => {
		await completeOnboarding();
		router.replace("/(auth)/login");
	};

	return (
		<WelcomeScreen
			step={1}
			icon="📚"
			title="Luyện thi thông minh"
			description="Hệ thống SRS giúp bạn ghi nhớ câu hỏi quan trọng, tập trung vào điểm yếu cá nhân."
			buttonLabel="Tiếp theo →"
			backgroundColor="#F2C84D"
			bubbleColor="#FFF1A4"
			onSkip={handleSkip}
			onNext={() => router.push("/(onboarding)/welcome-2")}
		/>
	);
}
