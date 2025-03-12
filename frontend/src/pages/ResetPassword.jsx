import { motion } from "framer-motion";
import { Eye, EyeClosed, Lock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { authStore } from "../stores/authStore";

const PasswordStrengthMeter = ({ password }) => {
  const strongPassword = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };
  const strength = strongPassword(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500";
    if (strength === 1) return "bg-red-400";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getStrongPasswordTxt = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1 font-poppins">
        <span className="text-xs text-gray-500 font-poppins">
          Password Strength:
        </span>
        <span className="text-xs text-gray-500 font-poppins">
          {getStrongPasswordTxt(strength)}
        </span>
      </div>
      <div className="flex space-x-1">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${
              index < strength ? getColor(strength) : "bg-gray-200 font-poppins"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = authStore();
  const [passwordError, setPasswordError] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError("");
    }

    try {
      await resetPassword(token, password);
      toast.success(
        "Password reset successfully, redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100 overflow-hidden">
      <main className="flex-grow flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white rounded-xl shadow-lg py-10 px-10"
        >
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="w-16 h-16 bg-yellow-600 rounded-xl flex items-center justify-center mb-4 shadow-lg"
            >
              <Lock className="h-8 w-8 text-white" />
            </motion.div>

            <h2 className="text-3xl font-extrabold text-center font-poppins text-black mb-2 drop-shadow-lg">
              Reset Password
            </h2>
            <p className="text-sm text-gray-600 mb-3 text-center font-poppins">
              Enter your new password below. Make sure it&apos;s strong and
              unique to keep your account secure.
            </p>

            {error && (
              <p className="text-red-500 text-sm mb-4 font-poppins">{error}</p>
            )}
            {message && (
              <p className="text-yellow-600 text-sm mb-4 font-poppins">
                {message}
              </p>
            )}

            <form onSubmit={handleSubmit} className="w-full space-y-4">
              <div className="relative">
                <Input
                  icon={Lock}
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/4 transform -translate-y-[45%] text-yellow-600 hover:text-gray-400"
                >
                  {showNewPassword ? <EyeClosed /> : <Eye />}
                </button>
                <PasswordStrengthMeter password={password} />
              </div>

              <div className="relative">
                <Input
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-yellow-600 hover:text-gray-400"
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1 font-poppins text-center">
                  {passwordError}
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Set New Password"}
              </motion.button>
              <p className="text-sm text-gray-600 mt-2 text-center font-poppins">
                If you did not request this password reset or need help, please{" "}
                <Link
                  to="/contact-us"
                  className="text-yellow-600 hover:underline"
                >
                  contact our support team
                </Link>
                .
              </p>
            </form>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ResetPassword;
