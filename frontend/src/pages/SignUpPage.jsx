import { motion } from "framer-motion";
import { Eye, EyeClosed, Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Input from "../components/Input";
import Navbar from "../components/Navbar";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import PrivacyAgreementCheckbox from "../components/PrivacyAgreementCheckbox ";
import RoleDropdown from "../components/RoleDropdown";
import { authStore } from "../stores/authStore";
const carouselImages = [
  {
    src: "/Content team-amico.svg",
    text: "Empowering individuals with disabilities through inclusive opportunities.",
  },
  {
    src: "/Web search-amico.svg",
    text: "Find accessible jobs tailored to your skills and abilities.",
  },
  {
    src: "/Working-cuate.svg",
    text: "Gain access to resources designed for an inclusive workforce.",
  },
];

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("");
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const navigate = useNavigate();

  const { signup, isError, isLoading } = authStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await signup(email, password, name, role, agreedToPrivacy);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-10">
        <div className="flex w-full max-w-6xl mx-auto shadow-lg rounded-xl overflow-hidden bg-white">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex md:w-1/2 items-center justify-center bg-yellow-500 p-6"
          >
            <Slider {...sliderSettings} className="w-4/5">
              {carouselImages.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={item.src}
                    alt={`carousel-${index}`}
                    className="w-[80%] max-h-[300px] object-contain"
                  />
                  <p className="text-white text-lg font-poppins font-semibold mt-4 text-center">
                    {item.text}
                  </p>
                </div>
              ))}
            </Slider>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 flex flex-col justify-center p-10 bg-white"
          >
            <h2 className="text-3xl font-bold text-start font-poppins text-black mb-2 tracking-wide">
              Create Your Account
            </h2>
            <h6 className="text-sm text-start font-poppins text-gray-700 mb-4">
              Unlock more Inclusive Job Opportunities
            </h6>

            <form onSubmit={handleSignUp} className="space-y-4">
              <Input
                icon={User}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 px-4 bg-gray-100 border border-gray-300 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <RoleDropdown role={role} setRole={setRole} />

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

              {password.length > 0 && (
                <div className="max-h-36 overflow-hidden">
                  <PasswordStrengthMeter password={password} />
                </div>
              )}

              <PrivacyAgreementCheckbox
                agreedToPrivacy={agreedToPrivacy}
                setAgreedToPrivacy={setAgreedToPrivacy}
                className="mt-2"
              />

              {isError && (
                <p className="text-sm text-red-500 text-center font-poppins">
                  {isError}
                </p>
              )}

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
                  "Sign Up"
                )}
              </motion.button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-black font-poppins">
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
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
