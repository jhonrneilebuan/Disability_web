import { motion } from "framer-motion";
import { useState } from "react";
import { authStore } from "../stores/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = authStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-applicant-nbg-3 bg-no-repeat bg-cover bg-center overflow-auto">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-lg p-8"
        >
          <div >
            <h2 className="text-3xl font-extrabold text-start font-poppins text-white mb-2 drop-shadow-lg">
              Forgot Password
            </h2>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <p className="text-gray-200 mb-6 text-start">
                  Enter your email address and we&apos;ll send you a link to reset your
                  password.
                </p>
                <Input
                  icon={Mail}
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200"
                  type="submit"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin mx-auto text-white" />
                  ) : (
                    "Send Reset Link"
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Mail className="h-8 w-8 text-white" />
                </motion.div>
                <p className="text-gray-200 mb-6">
                  If an account exists for {email}, you will receive a password
                  reset link shortly.
                </p>
              </div>
            )}
          </div>

          <div className="px-8 py-4 flex justify-center">
            <Link
              to={"/login"}
              className="text-sm text-yellow-600 hover:underline flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};
export default ForgotPassword;
