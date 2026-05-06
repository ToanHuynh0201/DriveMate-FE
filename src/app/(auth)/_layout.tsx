import { useAuthStore } from "@/store/auth.store";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
	const { isAuthenticated, isLoading } = useAuthStore();

	if (isLoading) return null;

	if (isAuthenticated) {
		return <Redirect href="/(tabs)" />;
	}

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="login" />
			<Stack.Screen name="forgot-password" />
		</Stack>
	);
}
