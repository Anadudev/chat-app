import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { MessageType, UserType, ChatStoreState, MessageInputType } from "../types/types";
import { useAuthStore } from "./useAuthStore";


export const useChatStore = create<ChatStoreState>((set, get) => ({
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
			// @ts-expect-error error type
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
			// @ts-expect-error error type
			toast.error(error.response.data);
		} finally {
			set({
				messagesLoading
					: false
			});
		}
	},

	sendMessage: async (messageData: MessageInputType) => {
		try {
			const { selectedUser, messages } = get();
			const response = await axiosInstance.post(`/messages/send/${selectedUser?._id}`, {
				...messageData
			});
			console.log(response);
			// debugging ----------------
			set({ 'messages': [...messages, response.data.message] });
		} catch (error) {
			console.error("[sendMessage] Error sending message: ", error);
			// @ts-expect-error error type
			toast.error(error.response.data || 'Error sending message');
		}
	},

	/**
	 * Subscribe to new messages event.
	 * When a new message is received from the server, add it to the messages state.
	 * This is used to keep the chat updated in real-time.
	 */
	subscribeToMessages: () => {
		const { selectedUser } = get();
		if (selectedUser) {
			const socket = useAuthStore.getState().socket;
			socket.on("newMessage", (message: MessageType) => {
				if (message.senderId !== selectedUser._id) return;
				set({ messages: [...get().messages, message] });
			});
		}
	},
	unsubscribeFromMessages: () => {
		const socket = useAuthStore.getState().socket;
		socket.off("newMessage");
	},

	/**
	 * Sets the selected user in the chat store.
	 * @param selectedUser The user to select
	 */
	setSelectedUser: (selectedUser: UserType | null) => {
		set({ selectedUser });
	},
}));
