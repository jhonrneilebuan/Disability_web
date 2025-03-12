import { motion } from "framer-motion";
import { Eye, EyeClosed, Loader, Lock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import { authStore } from "../stores/authStore";

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow flex items-center justify-center">
        <div className="flex w-full max-w-6xl mx-auto h-[80vh] shadow-lg rounded-xl overflow-hidden bg-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex flex-1 items-center justify-center bg-yellow-500 p-6"
          >
            <img
              src="/Content team-amico.svg"
              alt="login-logo"
              className="w-4/5 h-auto object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-center p-10 bg-white"
          >
            <h2 className="text-3xl font-bold text-start font-poppins text-black mb-2 tracking-wide">
              Welcome Back!
            </h2>
            <h6 className="text-sm text-start font-poppins text-gray-700 mb-6">
              Sign in to Access Your Account
            </h6>
            <form onSubmit={handleLogin} className="space-y-6">
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="relative">
                <Input
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center font-poppins">
                  {error}
                </p>
              )}

              <div className="flex justify-between items-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-black hover:text-gray-400 hover:underline font-poppins"
                >
                  Forgot Password?
                </Link>
              </div>

              <motion.button
                className="w-full py-3 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Login"
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-black font-poppins">
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
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
