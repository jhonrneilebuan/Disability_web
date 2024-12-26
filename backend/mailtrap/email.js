// for Email Testing
import { mailtrapClient, sender } from "../mailtrap/mailtrap.config.js";
import {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log(`Email sent successfully ${response}`);
  } catch (error) {
    console.error(`Error sending verification ${error}`);
    throw new Error(`Error sending verification email: ${error}`);
  }
};

export const sendWelcomeEmail = async (email, fullName) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "63a7435e-a59a-49ef-b17a-c48a3f282e41",
      template_variables: {
        company_info_name: "DISABILITY CAREER",
        name: fullName,
      },
    });

    console.log("Welcome email send sucessfully", response);
  } catch (error) {
    console.error(`Error sending welcome email ${error}`);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
  } catch (error) {
    console.error(`Error sending reset password email ${error}`);
    throw new Error(`Error sending reset password  email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
        from: sender,
        to: recipient,
        subject: "Password Reset Successful",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Password Reset"
    });

    console.log("Reset password email sent successfully", response);
  } catch (error) {
    console.error(`Error sending reset password email ${error}`);
    throw new Error(`Error sending reset password email: ${error}`);
  }
};
