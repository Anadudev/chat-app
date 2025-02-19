import { create } from "zustand";


export const useThemeStore = create((set) => ({
	theme: localStorage.getItem("chat-theme") || "light",
	/**
	 * Sets the theme for the chat application and stores it in local storage.
	 *
	 * @param theme - The theme to set. Can be one of "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset".
	 */
	setTheme: (theme: string) => {
		localStorage.setItem("chat-theme", theme);
		set({ theme });
	},
}));
