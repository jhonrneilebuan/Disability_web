import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import { transporter } from "./gmail.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error(`Error sending verification ${error}`);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, fullName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      template_uuid: "63a7435e-a59a-49ef-b17a-c48a3f282e41",
      template_variables: {
        company_info_name: "DISABILITY CAREER",
        name: fullName,
      },
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email send sucessfully", +info.response);
  } catch (error) {
    console.error(`Error sending welcome email ${error}`);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error(`Error sending reset password email ${error}`);
    throw new Error(`Error sending reset password  email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully", info.response);
  } catch (error) {
    console.error(`Error sending reset password email ${error}`);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};

export const sendConfirmationEmail = async (applicantId, jobId) => {
  const applicant = await User.findById(applicantId);
  const job = await Job.findById(jobId);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: applicant.email,
    subject: "Application Confirmation",
    text: `Dear ${applicant.name},\n\nYou have successfully applied for the position: ${job.title}.\n\nThank you for using our platform.\n\nBest regards,\nYour Team`,
  };

  return transporter.sendMail(mailOptions);
};

export const sendContactUsEmail = async (name, email, subject, message) => {
  try {
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Us: ${subject}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contact Form Submission</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20; color: #333;">
        <div style="width: 100%; max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
          <h3 style="text-align: center; color: #333; font-size: 24px; margin-bottom: 20px;">Contact Form Submission</h3>
          <div style="font-size: 16px; line-height: 1.6; color: #555;">
            <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Subject:</strong> ${subject}</p>
            <p style="margin: 10px 0;"><strong style="color: #333;">Message:</strong></p>
            <p style="margin: 10px 0;">${message}</p>
          </div>
        </div>
      </body>
      </html>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Contact Us email sent: " + info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending contact email: ", error);
    throw new Error("Error sending contact email.");
  }
};
