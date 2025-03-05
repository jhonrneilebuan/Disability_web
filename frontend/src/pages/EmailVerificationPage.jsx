import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
// import Navbar from "../components/Navbar";

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
    <div className="min-h-screen flex flex-col bg-applicant-nbg-3 bg-no-repeat bg-cover bg-center overflow-auto">

      <main className="flex-grow flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white bg-opacity-30 backdrop-blur-sm rounded-xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-extrabold text-start font-poppins text-white mb-2 drop-shadow-lg">
            Verify Your Email
          </h2>
          <p className="text-start text-gray-200 mb-8">
            Enter the 6-digit code sent to your email to continue your job search.
          </p>
          <form onSubmit={handleSubmit}>
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
                  className="w-14 h-14 text-center text-3xl font-bold bg-gray-100 text-gray-800 border-2 border-gray-300 rounded-xl focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200 ease-in-out transform hover:scale-105"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 font-semibold text-center mt-4">
                {error}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || code.some((digit) => !digit)}
              className="mt-5 w-full py-3 px-4 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition duration-200"
              aria-label="Verify Email"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin inline-block mr-2" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </motion.button>
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default EmailVerificationPage;
