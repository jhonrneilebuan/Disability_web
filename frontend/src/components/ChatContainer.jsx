import { CircleX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "../lib/utils";
import { authStore } from "../stores/authStore";
import { chatStore } from "../stores/chatStore";
import ChatHeader from "./ChatHeader";
import MessagesInput from "./MessagesInput";
import MessagesSkeleton from "./MessagesSkeleton";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = chatStore();
  const { user } = authStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const images = document.querySelectorAll("img");
    const promises = Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        })
    );

    Promise.all(promises).then(scrollToBottom);
  }, [messages]);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  const handleImageClick = (image) => {
    setZoomedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setZoomedImage(null);
    setIsModalOpen(false);
  };

  if (isMessagesLoading) {
    return (
      <div className="flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <MessagesSkeleton />
        <MessagesInput />
      </div>
    );
  }

  const formatMessageText = (text) => {
    const urlPattern = /https?:\/\/[^\s]+/g; 
    return text.replace(urlPattern, (url) => {
      return `<a href="${url}" target="_blank" class="text-blue-500 hover:underline">${url}</a>`;
    });
  };

  return (
    <main className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === user._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="flex items-start space-x-2">
              {message.senderId !== user._id && (
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={selectedUser.profilePicture || "/avatar.png"}
                      alt="profilePicture"
                    />
                  </div>
                </div>
              )}

              <div
                className={`flex flex-col ${
                  message.senderId === user._id ? "items-end" : "items-start"
                }`}
              >
                <div className="chat-header mb-1">
                  <time className="text-xs opacity-50 ml-1">
                    {formatTime(message.createdAt)}
                  </time>
                </div>
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2 cursor-pointer"
                    onClick={() => handleImageClick(message.image)}
                  />
                )}
                 {message.text && (
                  <div
                    className={`chat-bubble text-start items-center justify-center max-w-96 ${
                      message.senderId === user._id
                        ? "text-right self-end chat-bubble-primary"
                        : "text-left self-start chat-bubble-info"
                    }  ${
                      message.text.includes(" ") ? "" : "overflow-hidden truncate"
                    } `}
                    dangerouslySetInnerHTML={{
                      __html: formatMessageText(message.text),
                    }}
                  ></div>
                )}
              </div>

              {message.senderId === user._id && (
                <div className="chat-image avatar">
                  <div className="size-10 rounded-full border">
                    <img
                      src={user.profilePicture || "/avatar.png"}
                      alt="profilePicture"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>
      <MessagesInput />

      {isModalOpen && zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={handleCloseModal}
        >
          <div className="relative inline-block">
            <img
              src={zoomedImage}
              alt="Zoomed"
              className="max-w-full max-h-screen rounded-md"
            />
            <CircleX
              className="absolute top-[-16px] right-[-16px] bg-white p-1 rounded-full shadow-md cursor-pointer"
              size={24}
              onClick={handleCloseModal}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ChatContainer;
