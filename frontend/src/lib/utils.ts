/**
 * Format a message time string
 * @param {string} data - The message time as a string
 * @returns {string} The formatted message time
 */
export const formatMessageTime = (data: string) => {
	return new Date(data).toLocaleTimeString("en-us", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	});
}
