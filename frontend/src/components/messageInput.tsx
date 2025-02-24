import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import EmojiInput from "./emojiInput";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { sendMessage } = useChatStore();
  const [openEmoji, setOpenEmoji] = useState(false);

  const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        const base64Image = reader.result;
        setImagePreview(base64Image as string);
        await sendMessage({ profilePic: base64Image });
      };
    }
    toast.error("No image selected");
  };

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Image removed successfully");
  };

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessage({ text: text.trim(), image: imagePreview });

      // Reset the form
      console.log("Resetting form");
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("[handleSendMessage] Error sending message: ", error);
    }
  };

  const fileInputRef = useRef(null);

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt=""
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      <form
        action=""
        onSubmit={handleSendMessage}
        className="flex items-center gap-2"
      >
          <EmojiInput text={text} setText={setText} openEmoji={openEmoji} setOpenEmoji={setOpenEmoji} />
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            name=""
            id=""
            onFocus={() => setOpenEmoji(false)}
            placeholder="Type a message"
            className="w-full input-bordered rounded-lg input-sm sm:input-md"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            name=""
            accept="image/*"
            id=""
            ref={fileInputRef}
            onChange={selectImage}
            className="hidden"
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle ${
              imagePreview ? "text-emerald-500" : "text-zinc-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        Send
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          onClick={() => setOpenEmoji(false)}
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
