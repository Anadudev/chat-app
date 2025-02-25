export interface SignUpDataType {
	name: string
	email: string,
	password: string
}

export interface LoginDataType {
	email: string,
	password: string
}

export interface UserType {
	_id: string,
	name: string,
	email: string,
	profilePic: string
	createdAt?: string,
	updatedAt?: string
}


export interface MessageType {
	_id: string,
	senderId: string,
	text: string,
	image: string,
	createdAt?: string,
	updatedAt?: string
}

export interface MessageInputType {
	text?: string,
	image?: string | ArrayBuffer | null,
}


export interface AuthStoreState {
	authUser: null | UserType;
	singUpLoading: boolean;
	loginLoading: boolean;
	updateProfileLoading: boolean;
	checkAuthLoading: boolean;
	onlineUsers: string[];
	socket: null | any;

	checkAuth: () => void;
	signup: (data: SignUpDataType) => void;
	logout: () => void;
	login: (data: LoginDataType) => void;
	updateProfile: (data: { profilePic: string | ArrayBuffer | null }) => Promise<void>;
	connectSocket: () => void;
	disconnectSocket: () => void;
}

export interface ChatStoreState {
	messages: MessageType[];
	users: UserType[];
	selectedUser: UserType | null;
	usersLoading: boolean;
	messagesLoading: boolean;
	getUsers: () => void;
	getMessages: (userId: string) => void;
	sendMessage: (messageData: MessageInputType) => void;
	subscribeToMessages: () => void;
	unsubscribeFromMessages: () => void;
	setSelectedUser: (user: UserType | null) => void;
}

export interface EmojiInputProps {
	text: string;
	setText: (text: string) => void;
	openEmoji: boolean;
	setOpenEmoji: (openEmoji: boolean) => void;
}

export interface ThemeStoreState {
	theme: string;
	setTheme: (theme: string) => void;
}
