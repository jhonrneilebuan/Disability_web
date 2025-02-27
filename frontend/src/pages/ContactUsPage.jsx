import  { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userStore } from "../stores/userStore";

const ContactUsPage = () => {
  const { contactForm, isLoading, error, setContactField, sendContactForm } = userStore();
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
  
    if (!contactForm.name.trim()) {
      errors.name = "Name is required";
    } else if (contactForm.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
  
    if (!contactForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(contactForm.email)) {
      errors.email = "Invalid email address";
    }
  
    if (!contactForm.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (contactForm.subject.trim().length < 3) {
      errors.subject = "Subject must be at least 3 characters";
    }
  
    if (!contactForm.message.trim()) {
        errors.message = "Message is required";
      } else if (contactForm.message.trim().length < 10) {
        errors.message = "Message must be at least 10 characters";
      } else if (contactForm.message.trim().length > 120) {
        errors.message = "Message cannot exceed 120 characters";
      }
      
  
    return errors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    await sendContactForm();
  };

  return (
    <div className="font-poppins">
      <Navbar />
      <div className="flex justify-center items-start min-h-screen pt-10 mb-20 bg-gradient-to-br from-pink-50 via-yellow-50 to-orange-50">

      <div className="max-w-7xl w-full grid grid-cols-2 gap-20">
          <div className="flex flex-col justify-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-lg text-gray-700 mb-4">
            Reach out to us via email, phone, or by filling out the form. We&apos;re here to assist you and provide the solutions you need.            </p>
            <p className="text-lg text-gray-700 mb-1">CareerDisability@gmail.com</p>
            <p className="text-lg text-gray-700 mb-1">(+63)-961-629-7058</p>
            <a href="#" className="text-brown-600 underline font-medium">
              Customer Support
            </a>
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Support</h3>
                <p className="text-gray-700 text-sm">
                  Our support team is available 24/7 to address any concerns or queries you may have.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Feedback and Suggestions</h3>
                <p className="text-gray-700 text-sm">
                  We value your feedback and continuously work to improve our service.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Media Inquiries</h3>
                <p className="text-gray-700 text-sm">
                  For press or media-related questions, contact us at CareerDisability@gmail.com.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  value={contactForm.name}
                  onChange={(e) => setContactField("name", e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {formErrors.name && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  value={contactForm.email}
                  onChange={(e) => setContactField("email", e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactField("subject", e.target.value)}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                />
                {formErrors.subject && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.subject}</p>
                )}
              </div>
              <div>
                <textarea
                  placeholder="How can we help?"
                  value={contactForm.message}
                  onChange={(e) => setContactField("message", e.target.value)}
                  className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-brown-500"
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-4">
              Thank you for reaching out — we’ll be in touch soon!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUsPage;
