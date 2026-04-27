import { User } from "@/models/user.model";
import { storage } from "@/utils/storage";
import { create } from "zustand";

interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	hasSeenOnboarding: boolean;
}

interface AuthActions {
	initialize: () => Promise<void>;
	setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
	setUser: (user: User) => void;
	completeOnboarding: () => Promise<void>;
	resetOnboardingForDev: () => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
	user: null,
	accessToken: null,
	refreshToken: null,
	isAuthenticated: false,
	isLoading: true,
	hasSeenOnboarding: false,

	initialize: async () => {
		try {
			const [accessToken, refreshToken, hasSeenOnboarding] =
				await Promise.all([
					storage.getToken(),
					storage.getRefreshToken(),
					storage.getOnboardingSeen(),
				]);

			set({
				accessToken,
				refreshToken,
				hasSeenOnboarding,
				isAuthenticated: !!accessToken,
			});
		} finally {
			set({ isLoading: false });
		}
	},

	setTokens: async (accessToken, refreshToken) => {
		await storage.saveToken(accessToken);
		await storage.saveRefreshToken(refreshToken);
		set({ accessToken, refreshToken, isAuthenticated: true });
	},

	setUser: (user) => set({ user }),

	completeOnboarding: async () => {
		await storage.saveOnboardingSeen();
		set({ hasSeenOnboarding: true });
	},

	resetOnboardingForDev: async () => {
		if (!__DEV__) {
			return;
		}

		await storage.clearOnboardingSeen();
		set({ hasSeenOnboarding: false });
	},

	logout: async () => {
		await storage.clearTokens();
		set({
			user: null,
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,
		});
	},
}));
