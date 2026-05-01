import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { useAuthStore } from "@/store/auth.store";
import { useShallow } from "zustand/react/shallow";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const router = useRouter();
	const { initialize, isLoading, hasSeenOnboarding } = useAuthStore(
		useShallow((state) => ({
			initialize: state.initialize,
			isLoading: state.isLoading,
			hasSeenOnboarding: state.hasSeenOnboarding,
		})),
	);

	useEffect(() => {
		initialize();
	}, [initialize]);

	useEffect(() => {
		if (!isLoading && !hasSeenOnboarding) {
			router.replace("/(onboarding)");
		}
	}, [isLoading, hasSeenOnboarding]);

	if (isLoading) {
		return null;
	}

	return (
		<ThemeProvider
			value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
				<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen
					name="modal"
					options={{ presentation: "modal", title: "Modal" }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</ThemeProvider>
	);
}
