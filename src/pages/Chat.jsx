import { useCallback, useEffect, useRef, useState } from "react";
import "./ChatStyle.css";
import { IoSend } from "react-icons/io5";
import { FiPaperclip } from "react-icons/fi";
import { MdEmojiEmotions } from "react-icons/md";
import EmojiPicker from "../Components/EmojiPicker";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { connectSocket, disconnectSocket } from "../lib/socket";

const Chat = () => {
  const user = useSelector((state) => state?.YATipauy?.user);
  const currentUser = user?.user || user || null;
  const userEmail = currentUser?.email || currentUser?.userEmail || "";
  const userName = currentUser?.userName || currentUser?.name || userEmail;
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const emojiButtonRef = useRef(null);

  const API_BASE = "https://yaticare-backend.onrender.com/api/chat";

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const appendIncomingMessage = useCallback(
    (incomingMessage) => {
      if (!incomingMessage) return;

      const payload =
        incomingMessage?.data ||
        incomingMessage?.message ||
        incomingMessage?.body ||
        incomingMessage?.content ||
        incomingMessage;

      const messageId =
        payload?._id ||
        payload?.id ||
        `${payload?.createdAt || payload?.timestamp || Date.now()}-${getMessageText(payload)}`;

      setMessages((prev) => {
        if (!payload || prev.some((msg) => (msg._id || msg.id) === messageId)) {
          return prev;
        }
        return [...prev, payload];
      });

      const senderRole = String(
        payload?.senderRole || payload?.sender || "",
      ).toLowerCase();
      const isIncomingFromUser = senderRole === "user";

      if (!isIncomingFromUser && conversationId) {
        try {
          window.dispatchEvent(
            new CustomEvent("chat:new-message", {
              detail: {
                conversationId,
                message: payload,
                count: 1,
              },
            }),
          );
        } catch {
          /* ignore */
        }

        axios
          .patch(`${API_BASE}/conversations/${conversationId}/read`, {
            role: "user",
          })
          .catch(() => {
            /* ignore */
          });

        try {
          window.dispatchEvent(
            new CustomEvent("chat:read", {
              detail: { conversationId },
            }),
          );
        } catch {
          /* ignore */
        }
      }
    },
    [API_BASE, conversationId],
  );

  useEffect(() => {
    if (!userEmail) {
      return undefined;
    }

    const socketClient = connectSocket({ userEmail });

    const handleAnyEvent = (event, payload) => {
      if (
        event === "connect" ||
        event === "disconnect" ||
        event === "reconnect" ||
        event === "connect_error" ||
        event === "reconnect_error"
      ) {
        return;
      }

      if (payload) {
        appendIncomingMessage(payload);
      }
    };

    socketClient.onAny(handleAnyEvent);

    return () => {
      socketClient.offAny(handleAnyEvent);
      disconnectSocket();
    };
  }, [userEmail, appendIncomingMessage]);

  useEffect(() => {
    if (!userEmail || !conversationId) {
      return;
    }

    const socketClient = connectSocket({ userEmail });

    socketClient.emit("join", { conversationId, userEmail });
    socketClient.emit("join_conversation", { conversationId, userEmail });
    socketClient.emit("setup", { userEmail, conversationId });
  }, [conversationId, userEmail]);

  useEffect(() => {
    let mounted = true;

    const fetchConversation = async () => {
      if (!userEmail) {
        setMessages([]);
        setConversationId("");
        return;
      }

      setIsFetching(true);

      try {
        const response = await axios.get(
          `${API_BASE}/user/${encodeURIComponent(userEmail)}`,
        );

        const conversation = response?.data?.data;

        if (!mounted) return;

        const convId = conversation?._id || conversation?.id;

        if (!convId) {
          setConversationId("");
          setMessages([]);
          return;
        }

        setConversationId(convId);

        const messagesResponse = await axios.get(
          `${API_BASE}/conversations/${convId}/messages`,
        );

        if (!mounted) return;

        setMessages(messagesResponse?.data?.data?.messages || []);

        await axios.patch(`${API_BASE}/conversations/${convId}/read`, {
          role: "user",
        });
        try {
          window.dispatchEvent(
            new CustomEvent("chat:read", {
              detail: { conversationId: convId },
            }),
          );
        } catch {
          /* ignore */
        }
      } catch (error) {
        if (!mounted) return;
        console.error(
          "Error fetching chat conversation:",
          error?.response || error,
        );
        toast.error("Unable to load chat messages right now.");
      } finally {
        if (mounted) {
          setIsFetching(false);
        }
      }
    };

    fetchConversation();

    return () => {
      mounted = false;
    };
  }, [userEmail]);

  const handleSendMessage = async () => {
    const trimmedMessage = inputValue.trim();

    if (!trimmedMessage || !userEmail) return;

    setInputValue("");
    setShowEmojiPicker(false);
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/messages`, {
        conversationId: conversationId || undefined,
        senderRole: "user",
        senderEmail: userEmail,
        senderName: userName,
        userEmail,
        userName,
        message: trimmedMessage,
      });
      const responseConversation = response?.data?.data?.conversation;
      const responseMessage = response?.data?.data?.message;

      const respConvId = responseConversation?._id || responseConversation?.id;

      if (respConvId) {
        setConversationId(respConvId);
      }

      if (responseMessage) {
        setMessages((previousMessages) => [
          ...previousMessages,
          responseMessage,
        ]);
      }

      await axios.patch(
        `${API_BASE}/conversations/${respConvId || conversationId}/read`,
        {
          role: "user",
        },
      );
      try {
        window.dispatchEvent(
          new CustomEvent("chat:read", {
            detail: { conversationId: respConvId || conversationId },
          }),
        );
      } catch {
        /* ignore */
      }
    } catch (error) {
      console.error("Error sending message:", error?.response || error);
      toast.error(
        error?.response?.data?.message ||
          "Failed to send message. Please try again.",
      );
      setInputValue(trimmedMessage);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setInputValue(inputValue + emoji);
    inputRef.current?.focus();
  };

  const getMessageText = (message) => {
    return (
      message?.message ||
      message?.text ||
      message?.body ||
      message?.content ||
      ""
    );
  };

  const formatTime = (date) => {
    const safeDate = date ? new Date(date) : new Date();
    return safeDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isUserMessage = (message) => message.senderRole === "user";

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-header-content">
          <div className="admin-avatar">💬</div>
          <div className="chat-header-info">
            <h3>YatiCare Support</h3>
            <p className="status">
              {isFetching ? "Loading conversation..." : "Support"}
            </p>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && !isFetching && (
          <div className="message admin-message">
            <div className="message-bubble admin">
              <p>
                You have no messages yet. Start the conversation and support
                will reply here.
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={
              message._id ||
              message.id ||
              `${message.createdAt}-${message.message}`
            }
            className={`message ${isUserMessage(message) ? "user-message" : "admin-message"}`}
          >
            <div
              className={`message-bubble ${isUserMessage(message) ? "user" : "admin"}`}
            >
              {getMessageText(message) ? (
                <p>{getMessageText(message)}</p>
              ) : null}
              <span className="message-time">
                {formatTime(message.createdAt || message.timestamp)}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message admin-message">
            <div className="message-bubble admin">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        {showEmojiPicker && (
          <EmojiPicker
            onEmojiSelect={handleEmojiClick}
            onClose={() => setShowEmojiPicker(false)}
          />
        )}

        <div className="input-wrapper">
          <button
            className="attach-btn"
            onClick={() =>
              toast.info("File attachments are not supported in chat yet.")
            }
            title="Attach file, photo, or video"
          >
            <FiPaperclip />
          </button>
          <button
            ref={emojiButtonRef}
            className="emoji-btn-trigger"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            title="Add emoji"
          >
            <MdEmojiEmotions />
          </button>
          <textarea
            ref={inputRef}
            className="message-input"
            placeholder="Type your message here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="1"
            disabled={!userEmail}
          />
          <button
            className="send-btn"
            onClick={handleSendMessage}
            disabled={inputValue.trim() === "" || !userEmail || isLoading}
            title="Send message"
          >
            <IoSend />
          </button>
        </div>
        <p className="chat-footer-text">
          {userEmail
            ? "We typically respond within 24 hours"
            : "Please log in to start a chat."}
        </p>
      </div>
    </div>
  );
};

export default Chat;
