import React, { useState } from "react";
import "./EmojiPickerStyle.css";

const EmojiPicker = ({ onEmojiSelect, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("smileys");

  const emojiCategories = {
    smileys: {
      label: "😊",
      emojis: [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "🥰",
      ],
    },
    gestures: {
      label: "👋",
      emojis: [
        "👋",
        "🤚",
        "🖐",
        "✋",
        "🖖",
        "👌",
        "🤌",
        "🤏",
        "✌",
        "🤞",
        "🫰",
        "🤟",
        "🤘",
        "🤙",
        "👍",
        "👎",
      ],
    },
    hearts: {
      label: "❤️",
      emojis: [
        "❤️",
        "🧡",
        "💛",
        "💚",
        "💙",
        "💜",
        "🖤",
        "🤍",
        "🤎",
        "💔",
        "💕",
        "💞",
        "💓",
        "💗",
        "💖",
        "💘",
      ],
    },
    flowers: {
      label: "🌹",
      emojis: [
        "🌹",
        "🥀",
        "🌺",
        "🌻",
        "🌼",
        "🌷",
        "🌱",
        "🌲",
        "🌳",
        "🌴",
        "🌵",
        "🌾",
        "🌿",
        "☘️",
        "🍀",
        "🎍",
      ],
    },
    food: {
      label: "🍕",
      emojis: [
        "🍕",
        "🍔",
        "🍟",
        "🌭",
        "🥪",
        "🌮",
        "🌯",
        "🥙",
        "🧆",
        "🍗",
        "🍖",
        "🌞",
        "🍝",
        "🍜",
        "🍲",
        "🥘",
      ],
    },
    activity: {
      label: "⚽",
      emojis: [
        "⚽",
        "🏀",
        "🏈",
        "⚾",
        "🥎",
        "🎾",
        "🏐",
        "🏉",
        "🥏",
        "🎳",
        "🎯",
        "🎱",
        "🎮",
        "🎲",
        "🎰",
        "🎪",
      ],
    },
    travel: {
      label: "✈️",
      emojis: [
        "✈️",
        "🚁",
        "🚂",
        "🚃",
        "🚄",
        "🚅",
        "🚆",
        "🚇",
        "🚈",
        "🚉",
        "🚊",
        "🚝",
        "🚞",
        "🚋",
        "🚌",
        "🚍",
      ],
    },
    objects: {
      label: "💡",
      emojis: [
        "💡",
        "🔦",
        "🏮",
        "📔",
        "📕",
        "📖",
        "📗",
        "📘",
        "📙",
        "📚",
        "📓",
        "📒",
        "📑",
        "🧷",
        "🪡",
        "🧵",
      ],
    },
  };

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji);
  };

  return (
    <div className="emoji-picker-container">
      <div className="emoji-picker-header">
        <h3>Emoji</h3>
        <button className="emoji-close-btn" onClick={onClose} title="Close">
          ✕
        </button>
      </div>

      <div className="emoji-categories">
        {Object.entries(emojiCategories).map(([key, category]) => (
          <button
            key={key}
            className={`category-tab ${selectedCategory === key ? "active" : ""}`}
            onClick={() => setSelectedCategory(key)}
            title={category.label}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="emoji-grid">
        {emojiCategories[selectedCategory].emojis.map((emoji, index) => (
          <button
            key={index}
            className="emoji-item"
            onClick={() => handleEmojiClick(emoji)}
            title={emoji}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
