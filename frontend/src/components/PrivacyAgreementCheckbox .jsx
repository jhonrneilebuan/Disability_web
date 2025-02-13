import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const PrivacyAgreementCheckbox = ({ agreedToPrivacy, setAgreedToPrivacy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const contentRef = useRef(null);

  // Load agreement state from local storage on component mount
  useEffect(() => {
    const savedAgreement = localStorage.getItem("agreedToPrivacy");
    if (savedAgreement === "true") {
      setAgreedToPrivacy(true);
    }
  }, []);

  const handleAgree = () => {
    setAgreedToPrivacy(true);
    localStorage.setItem("agreedToPrivacy", "true"); // Save agreement state
    setIsModalOpen(false);
  };

  const handleScroll = () => {
    const content = contentRef.current;
    if (content && content.scrollHeight - content.scrollTop <= content.clientHeight + 10) {
      setIsScrollable(true);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="privacyAgreement"
          checked={agreedToPrivacy}
          onChange={() => setIsModalOpen(true)}
          className="text-yellow-500 focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
        />
        <label htmlFor="privacyAgreement" className="ml-2 text-sm text-gray-400">
          I agree to the{" "}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-yellow-600 hover:underline"
          >
            Privacy Policy
          </button>
        </label>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg w-3/4 max-w-lg shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">Privacy Policy Agreement</h2>

            <div
              className="max-h-60 overflow-y-auto border p-4"
              ref={contentRef}
              onScroll={handleScroll}
            >
              <p className="mb-2">
                Thank you for using our job portal, dedicated to providing employment opportunities for persons with disabilities.
                By creating an account, you agree to the following terms:
              </p>

              <h3 className="font-bold mt-3">1. Data Collection and Usage</h3>
              <ul className="list-disc pl-6 mb-2">
                <li>Your personal data, including your name, email, and job-related information, will be securely stored.</li>
                <li>We use this information to match job seekers with inclusive employers.</li>
                <li>Employers will have limited access to your profile and contact details to facilitate recruitment.</li>
              </ul>

              <h3 className="font-bold mt-3">2. Confidentiality and Security</h3>
              <ul className="list-disc pl-6 mb-2">
                <li>Your data will not be sold, shared, or disclosed to third parties without your consent.</li>
                <li>Our platform employs industry-standard encryption to protect your information.</li>
              </ul>

              <h3 className="font-bold mt-3">3. User Responsibilities</h3>
              <ul className="list-disc pl-6 mb-2">
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>All provided information must be accurate and truthful to support fair hiring practices.</li>
              </ul>

              <h3 className="font-bold mt-3">4. Acceptance of Terms</h3>
              <p className="mb-2">
                By checking the agreement box, you confirm that you have read, understood, and accepted our Privacy Policy.
              </p>

              <p className="text-sm">
                For more details, visit our{" "}
                <Link to="/privacy-policy" className="text-yellow-600 hover:underline">
                  full Privacy Policy page
                </Link>.
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className={`px-4 py-2 font-semibold rounded-lg ${
                  isScrollable
                    ? "bg-yellow-600 text-white hover:bg-yellow-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={!isScrollable}
                onClick={handleAgree}
              >
                I Agree
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PrivacyAgreementCheckbox;
