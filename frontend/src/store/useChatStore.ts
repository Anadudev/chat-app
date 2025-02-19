import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { UserType } from "../types/types";

export const useChatStore = create((set, get) => ({
	messages: [],
	users: [],
	selectedUser: null,
	usersLoading: false,
	messagesLoading: false,
	getUsers: async () => {
		try {
			set({ usersLoading: true });
			const response = await axiosInstance.get("/messages/users");
			set({ users: response.data.users });
		} catch (error) {
			console.error("[getUsers] Error getting users: ", error);
			toast.error(error.response.data);
		} finally {
			set({ usersLoading: false });
		}
	},
	getMessages: async (userId: string) => {
		set({ messagesLoading: true });

		try {
			const response = await axiosInstance.get(`/messages/${userId}`);
			set({ messages: response.data.messages });
		} catch (error) {
			console.error("[getMessages] Error getting messages: ", error);
			toast.error(error.response.data);
		} finally {
			set({
				messagesLoading
					: false
			});
		}
	},
	sendMessage: async (messageData: { text: string; image: string }) => {
		const { selectedUser, messages } = get();
		try {
			const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`, {
				...messageData
			});
			set({ messages: [...messages, response.data.message] });
		} catch (error) {
			console.error("[sendMessage] Error sending message: ", error);
			toast.error(error.response.data|| 'Error sending message');
		}
	},
	setSelectedUser: (selectedUser: UserType) => {
		set({ selectedUser });
	},
}));
