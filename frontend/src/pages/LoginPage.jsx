import { motion } from "framer-motion";
import { Loader, Lock, Mail, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { authStore } from "../stores/authStore";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { user, login, error, isLoading } = authStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      if (user?.role) {
        if (user.role === "Applicant") {
          navigate("/applicant");
        } else if (user.role === "Employer") {
          navigate("/employer");
        } else if (user.role === "Admin") {
          navigate("/admin");
        }
      }
      toast.success("Login successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-applicant-nbg-3 bg-no-repeat bg-cover bg-center overflow-auto">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-start font-poppins text-white mb-2">
            Welcome Back!
          </h2>
          <h6 className="text-sm text-start font-poppins text-gray-200 mb-6">
            Sign in to Access your Account
          </h6>
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="relative">
              <Input
                icon={Lock}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-200 hover:text-gray-400 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center mt-2">{error}</p>
            )}

            <motion.button
              className="w-full py-2.5 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Login"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-200">
              Don&apos;t have an account?{" "}
              <Link
                to="/sign-up"
                className="text-yellow-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LoginPage;