import { Link } from "react-router-dom";

const PrivacyAgreementCheckbox = ({ agreedToPrivacy, setAgreedToPrivacy }) => {
  return (
    <div className="flex items-center mt-2 mb-0">
      <input
        type="checkbox"
        id="privacyAgreement"
        checked={agreedToPrivacy}
        onChange={() => setAgreedToPrivacy(!agreedToPrivacy)}
        className="text-yellow-500 focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
        required
      />
      <label
        htmlFor="privacyAgreement"
        className="ml-2 text-sm text-gray-400"
      >
        I agree to the{" "}
        <Link
          to="/privacy-policy"
          className="text-yellow-600 hover:underline"
        >
          Privacy Policy
        </Link>
      </label>
    </div>
  );
};

export default PrivacyAgreementCheckbox;
