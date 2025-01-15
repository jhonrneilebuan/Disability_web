import { Plus, SendHorizontal, X } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { chatStore } from "../stores/chatStore";

const MessagesInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = chatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-lg border border-gray-300 shadow-sm"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center"
              type="button"
            >
              <X className="size-4 text-gray-700" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-3">
        <div className="flex-1 flex gap-3 items-center">
          <input
            type="text"
            className="w-full h-9 p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`${
              imagePreview ? "text-green-600" : "text-gray-500"
            } hover:text-green-700`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus size={24} />
          </button>
        </div>
        <button
          type="submit"
          className={`p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl disabled:opacity-50`}
          disabled={!text.trim() && !imagePreview}
        >
          <SendHorizontal size={20} className="fill-current" />
        </button>
      </form>
    </div>
  );
};

export default MessagesInput;
