import { transporter } from "./gmail.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

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
