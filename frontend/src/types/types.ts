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

export interface AuthStoreType {
	authUser: null | UserType,
	singUpLoading: boolean,
	loginLoading: boolean,
	updateProfileLoading: boolean,
	checkAuthLoading: boolean,
	checkAuth: () => void,
	signUp: (data: SignUpDataType) => void,
	login: (data: LoginDataType) => void,
}
