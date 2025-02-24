import React from "react";
import EmojiPicker from "emoji-picker-react";
import { Smile } from "lucide-react";

interface EmojiInputProps {
  text: string;
  setText: (text: string) => void;
  openEmoji: boolean;
  setOpenEmoji: (openEmoji: boolean) => void;
}

const EmojiInput: React.FC<EmojiInputProps> = ({
  text,
  setText,
  openEmoji,
  setOpenEmoji,
}) => {
  const handleEmojiSelect = (selectedEmoji: { emoji: string }) => {
    setText(text + selectedEmoji.emoji);
  };

  const toggleView = () => {
    setOpenEmoji(!openEmoji);
  };

  return (
    <div className="relative">
      <div
        className={`flex items-baseline absolute bottom-9 -left-4  ${
          openEmoji ? "block" : "hidden"
        }`}
      >
        <EmojiPicker
          onEmojiClick={handleEmojiSelect}
          className=""
          open={openEmoji}
          lazyLoadEmojis={true}
        />
      </div>
      <Smile className="size-7 cursor-pointer" onClick={toggleView} />
    </div>
  );
};

export default EmojiInput;
