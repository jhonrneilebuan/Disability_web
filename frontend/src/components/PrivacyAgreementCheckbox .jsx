import { Link } from "react-router-dom";

const PrivacyAgreementCheckbox = ({ agreedToPrivacy, setAgreedToPrivacy }) => {
  return (
    <div className="flex items-center mt-2 mb-0">
      <input
        type="checkbox"
        id="privacyAgreement"
        checked={agreedToPrivacy}
        onChange={() => setAgreedToPrivacy(!agreedToPrivacy)}
        className="text-green-500 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        required
      />
      <label
        htmlFor="privacyAgreement"
        className="ml-2 text-sm text-gray-400"
      >
        I agree to the{" "}
        <Link
          to="/privacy-policy"
          className="text-green-400 hover:underline"
        >
          Privacy Policy
        </Link>
      </label>
    </div>
  );
};

export default PrivacyAgreementCheckbox;
