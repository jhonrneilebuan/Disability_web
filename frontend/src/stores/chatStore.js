import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

const API_URL = "http://localhost:8080/api";
axios.defaults.withCredentials = true;

export const chatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsersForSidebar: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axios.get(`${API_URL}/messages/users`);
      set({ users: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: false });
    try {
      const response = await axios.get(`${API_URL}/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const response = await axios.post(
        `${API_URL}/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, response.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
