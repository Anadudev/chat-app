import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
	authUser: null,
	singUpLoading: false,
	loginLoading: false,
	updateProfileLoading: false,
	checkAuthLoading: false,

	checkAuth: async () => {
		try {
			set({ checkAuthLoading: true });
			const response = await axiosInstance.get("/auth/check");
			set({ authUser: response.data.user });
		} catch (error) {
			console.error("[checkAuth] Error checking user authentication: ", error);
			set({ authUser: null });
		} finally {
			set({ checkAuthLoading: false });
		}
	},
	// signup
	signup: async (data: any) => {
		try {
			set({ singUpLoading: true });
			const response = await axiosInstance.post("/auth/signup", data);
			set({ authUser: response.data.user });
		} catch (error) {
			console.error("[signup] Error signing up user: ", error);
		} finally {
			set({ singUpLoading: false });
		}
	}
}));
