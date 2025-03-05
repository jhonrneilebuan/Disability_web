import { motion } from "framer-motion";
import { Loader, Lock, Mail, User, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import PrivacyAgreementCheckbox from "../components/PrivacyAgreementCheckbox ";
import RoleDropdown from "../components/RoleDropdown";
import { authStore } from "../stores/authStore";
import Navbar from "../components/Navbar";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const navigate = useNavigate();

  const { signup, error, isLoading } = authStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name, role, agreedToPrivacy);
      navigate("/verify-email");
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
            Create Your Account
          </h2>
          <h6 className="text-sm text-start font-poppins text-gray-200 mb-6">
            Unlock more Inclusive Job Opportunities
          </h6>
          <form onSubmit={handleSignUp} className="space-y-6">
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <RoleDropdown role={role} setRole={setRole} />

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
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {password.length > 0 && <PasswordStrengthMeter password={password} />}

            <PrivacyAgreementCheckbox
              agreedToPrivacy={agreedToPrivacy}
              setAgreedToPrivacy={setAgreedToPrivacy}
              className="mt-3"
            />

            {error && (
              <p className="text-sm text-red-500 text-center mt-2">{error}</p>
            )}

            <motion.button
              className="w-full py-2.5 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-200">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-yellow-600 font-medium hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default SignUpPage;
