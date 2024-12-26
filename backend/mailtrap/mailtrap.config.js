// for Email Testing
import { MailtrapClient } from "mailtrap";
const TOKEN = "b859d05e355acdad99b3d0f1ef8c7c03";

export const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Disability Careers Team",
  
};
