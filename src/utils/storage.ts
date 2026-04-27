import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const ONBOARDING_SEEN_KEY = "onboarding_seen";

export const storage = {
	getToken: () => SecureStore.getItemAsync(ACCESS_TOKEN_KEY),
	saveToken: (token: string) =>
		SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token),
	removeToken: () => SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY),

	getRefreshToken: () => SecureStore.getItemAsync(REFRESH_TOKEN_KEY),
	saveRefreshToken: (token: string) =>
		SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token),
	removeRefreshToken: () => SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY),

	getOnboardingSeen: async () => {
		const value = await SecureStore.getItemAsync(ONBOARDING_SEEN_KEY);
		return value === "true";
	},
	saveOnboardingSeen: () =>
		SecureStore.setItemAsync(ONBOARDING_SEEN_KEY, "true"),
	clearOnboardingSeen: () => SecureStore.deleteItemAsync(ONBOARDING_SEEN_KEY),

	clearTokens: async () => {
		await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
		await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
	},
};
