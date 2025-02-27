import { sendContactUsEmail } from '../mailtrap/gmail.js';


export const contactUs = async (req, res) => {
  console.log("Incoming request:", req.headers);

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    await sendContactUsEmail(name, email, subject, message);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
};
