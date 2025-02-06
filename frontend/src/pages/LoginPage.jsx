import { motion } from "framer-motion";
import { Loader, Lock, Mail, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
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
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex max-w-full w-[calc(100vh)] bg-white bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden h-[60vh]"
      >
        <div className="flex justify-center items-center w-1/2 p-8 h-full">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">Login</h2>
            <form onSubmit={handleLogin}>
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <Input
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-600 hover:text-yellow-500"
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>

              <div className="mb-4">
                <Link to={"/forgot-password"} className="text-gray-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

              <motion.button
                className="mt-5 w-full py-3 px-4 bg-transparent text-black font-bold border-2 border-gray-400 rounded-lg shadow-lg hover:border-black hover:text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
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
            <div className="px-8 py-4 bg-opacity-50 flex justify-center">
              <p className="text-sm text-gray-500 flex items-center">
                Don&apos;t have an account?
                <Link to={"/"} className="text-yellow-600 hover:underline ml-2">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* temp img */}
        <div className="w-1/2 bg-applicant-bg-1 bg-cover h-full"></div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
