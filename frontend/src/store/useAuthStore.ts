import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { LoginDataType, SignUpDataType } from "../types/types";
import { LogOut } from "lucide-react";

export const useAuthStore = create((set) => ({
	authUser: null,
	singUpLoading: false,
	loginLoading: false,
	updateProfileLoading: false,
	checkAuthLoading: false,
	onlineUsers: [],

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
	signup: async (data: SignUpDataType) => {
		set({ singUpLoading: true });
		try {
			const response = await axiosInstance.post("/auth/signup", data);
			set({ authUser: response.data.user });
			toast.success('Account created successfully')
		} catch (error) {
			console.error("[signup] Error signing up user: ", error);
			toast.error(error.response.data)
		} finally {
			set({ singUpLoading: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			toast.success('User logged out successfully')
		} catch (error) {
			console.error("[LogOut] Error logging out user: ", error);
			toast.error(error.response.data)
		}
	},

	// login
	login: async (data: LoginDataType) => {
		set({ loginLoading: true });
		try {
			// return
			const response = await axiosInstance.post("/auth/login", data);
			set({ authUser: response.data.user });
			toast.success('User logged in successfully')
		} catch (error) {
			console.error("[login] Error logging in user: ", error);
			toast.error(error.response.data)
		} finally {
			set({ loginLoading: false });
		}
	},
	updateProfile: async (data: { profilePic: string }) => {
		set({ updateProfileLoading: true });
		try {
			const response = await axiosInstance.put("/auth/update-profile", data);
			set({ authUser: response.data.user });
			toast.success('Profile updated successfully')
		} catch (error) {
			console.error("[updateProfile] Error updating profile: ", error);
			toast.error(error.response.data)
		} finally {
			set({ updateProfileLoading: false });
		}
	}
}));
