import { WelcomeScreen } from "@/components/onboarding/welcome-screen";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "expo-router";
import { useState } from "react";

const STEPS = [
	{
		icon: "📚",
		title: "Luyện thi thông minh",
		description:
			"Hệ thống SRS giúp bạn ghi nhớ câu hỏi quan trọng, tập trung vào điểm yếu cá nhân.",
		buttonLabel: "Tiếp theo →",
		backgroundColor: "#F2C84D",
		bubbleColor: "#FFF1A4",
	},
	{
		icon: "📚",
		title: "Luyện thi thông minh",
		description:
			"Hệ thống SRS giúp bạn ghi nhớ câu hỏi quan trọng, tập trung vào điểm yếu cá nhân.",
		buttonLabel: "Tiếp theo →",
		backgroundColor: "#F2C84D",
		bubbleColor: "#FFF1A4",
	},
	{
		icon: "🗺️",
		title: "Sa hình & Thực hành ảo",
		description:
			"Luyện sa hình 2D tương tác và thực hành lệnh đường trường với hướng dẫn âm thanh.",
		buttonLabel: "Bắt đầu ngay",
		backgroundColor: "#0FB58F",
		bubbleColor: "#64DBBE",
	},
] as const;

export default function OnboardingScreen() {
	const router = useRouter();
	const completeOnboarding = useAuthStore((state) => state.completeOnboarding);
	const [step, setStep] = useState<1 | 2 | 3>(1);

	const handleSkip = async () => {
		await completeOnboarding();
		router.replace("/(auth)/login");
	};

	const handleNext = async () => {
		if (step < 3) {
			setStep((s) => (s + 1) as 2 | 3);
		} else {
			await completeOnboarding();
			router.replace("/(auth)/login");
		}
	};

	const current = STEPS[step - 1];

	return (
		<WelcomeScreen
			step={step}
			icon={current.icon}
			title={current.title}
			description={current.description}
			buttonLabel={current.buttonLabel}
			backgroundColor={current.backgroundColor}
			bubbleColor={current.bubbleColor}
			onSkip={handleSkip}
			onNext={handleNext}
		/>
	);
}
