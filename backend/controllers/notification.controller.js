import Notification from "../models/notification.model.js"

export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId; 

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 }) 

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};

export const markAllNotificationsAsRead = async (req, res) => {
  try {
    const userId = req.userId;
    await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });
    res.status(200).json({ message: "All notifications marked as read." });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    res.status(500).json({ error: "Failed to mark notifications as read." });
  }
};
