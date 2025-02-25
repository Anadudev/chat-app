import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { LoginDataType, SignUpDataType, AuthStoreState } from "../types/types";
import io from "socket.io-client";

const BASE_URL = "http://localhost:50001";

export const useAuthStore = create<AuthStoreState>((set, get) => ({
	authUser: null,
	singUpLoading: false,
	loginLoading: false,
	updateProfileLoading: false,
	checkAuthLoading: false,
	onlineUsers: [],
	socket: null,

	checkAuth: async () => {
		try {
			set({ checkAuthLoading: true });
			const response = await axiosInstance.get("/auth/check");
			set({ authUser: response.data.user });
			get().connectSocket();
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
			toast.success('Account created successfully');
			get().connectSocket();
		} catch (error) {
			console.error("[signup] Error signing up user: ", error);
			// @ts-expect-error error type
			toast.error(error?.response?.data)
		} finally {
			set({ singUpLoading: false });
		}
	},

	logout: async () => {
		try {
			await axiosInstance.post("/auth/logout");
			set({ authUser: null });
			toast.success('User logged out successfully');
			get().disconnectSocket();
		} catch (error) {
			console.error("[LogOut] Error logging out user: ", error);
			// @ts-expect-error error type
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
			toast.success('User logged in successfully');
			get().connectSocket();
		} catch (error) {
			console.error("[login] Error logging in user: ", error);
			// @ts-expect-error error type
			toast.error(error.response.data)
		} finally {
			set({ loginLoading: false });
		}
	},

	connectSocket: () => {
		const { authUser } = get();
		if (!authUser || get().socket?.connected) return;
		const socket = io(BASE_URL, {
			query: { userId: authUser._id },
		});
		socket.connect();
		set({ socket: socket });

		socket.on("getOnlineUsers", (userIds: string[]) => {
			set({ onlineUsers: userIds });
		});
	},

	disconnectSocket: () => {
		if (!get().socket?.connected) return;
		get().socket.disconnect();
		set({ socket: null });
	},

	updateProfile: async (data: { profilePic: string | ArrayBuffer | null }) => {
		set({ updateProfileLoading: true });
		try {
			const response = await axiosInstance.put("/auth/update-profile", data);
			set({ authUser: response.data.user });
			toast.success('Profile updated successfully')
		} catch (error) {
			console.error("[updateProfile] Error updating profile: ", error);
			// @ts-expect-error error type
			toast.error(error.response.data)
		} finally {
			set({ updateProfileLoading: false });
		}
	}
}));
