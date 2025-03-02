import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { verifyEmail, error, isLoading } = authStore();

  const handleChange = (index, value) => {
    const newcode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      let pasteIndex = index;
      123;
      for (let char of pastedCode) {
        if (pasteIndex < 6 && !newcode[pasteIndex]) {
          newcode[pasteIndex] = char;
          pasteIndex++;
        }
      }
      setCode(newcode);
      const nextIndex = newcode.findIndex(
        (digit, i) => digit === "" && i > index
      );
      inputRefs.current[nextIndex >= 0 ? nextIndex : 5]?.focus();
    } else {
      newcode[index] = value;
      setCode(newcode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      const { user } = authStore.getState();
      if (user?.role) {
        if (user.role === "Applicant") {
          navigate("/user-profiling");
        } else if (user.role === "Employer") {
          navigate("/employer");
        }
      }
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-900 via-brown-800 to-brown-700 flex items-center justify-center relative overflow-hidden">
        <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute w-64 h-64 bg-brown-600 rounded-full opacity-20 blur-3xl -top-32 -left-32"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute w-64 h-64 bg-brown-500 rounded-full opacity-20 blur-3xl -bottom-32 -right-32"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 w-full max-w-md mx-4"
      >
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">
            Verify Your Email
          </h2>
          <p className="text-center text-brown-100 mt-4">
            Enter the 6-digit code sent to your email to continue your job
            search.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-between gap-3">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-3xl font-bold bg-brown-100/10 text-brown-100 border-2 border-brown-200/20 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all duration-200 ease-in-out transform hover:scale-105"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-400 font-semibold text-center mt-4">
              {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:from-amber-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            aria-label="Verify Email"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
