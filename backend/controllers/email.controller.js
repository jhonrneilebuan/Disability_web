import Email from '../models/email.model.js'; 
import User from '../models/user.model.js';
import { transporter } from '../mailtrap/gmail.config.js';

export const sendEmail = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const recipientId = req.params.recipientId; 
    const employerId = req.userId; 

    if (!subject || !message) {
      return res.status(400).json({ message: 'All fields are required: subject, message' });
    }

    const employer = await User.findById(employerId); 
    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    const employerEmail = employer.email; 

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const recipientEmail = recipient.email;

    const mailOptions = {
      from: employerEmail,  
      to: recipientEmail,  
      subject: subject,     
      text: message,      
    };

    await transporter.sendMail(mailOptions);

    const newEmail = new Email({
      employerId: employerId,
      recipientId: recipientId,
      subject: subject,
      message: message,
    });

    await newEmail.save();

    res.status(200).json({ message: 'Email sent and saved successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'An error occurred while sending the email.', error: error.message });
  }
};
