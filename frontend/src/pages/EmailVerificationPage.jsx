import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { authStore } from "../stores/authStore";

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
          navigate("/edit-profile?fromSignup=true");
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
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-auto">
      <main className="flex-grow flex flex-col md:flex-row items-center justify-center p-6 gap-10">
        <img
          src="/New message-amico.svg"
          alt="Email Verification"
          className="w-3/4 md:w-1/2 lg:w-1/3 object-contain"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-10"
        >
          <h2 className="text-4xl font-extrabold font-poppins text-black mb-4 text-center">
            Verify Your Email
          </h2>
          <p className=" text-gray-700 mb-6 text-lg font-poppins text-center">
            Enter the 6-digit code sent to your email to continue your job
            search.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between gap-4">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-4xl font-bold bg-gray-100 text-black border-2 border-gray-300 rounded-xl focus:border-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600/50 transition-all duration-200 ease-in-out transform hover:scale-105"
                  aria-label={`Digit ${index + 1}`}
                />
              ))}
            </div>

            {error && (
              <p className="text-center mt-4 text-red-500 text-base font-poppins">
                {error}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || code.some((digit) => !digit)}
              className="mt-6 w-full py-3 px-5 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition duration-200 text-lg font-poppins"
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
