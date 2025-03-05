import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Privacy Policy</h1>

        <p className="text-gray-700 mb-4">
          Welcome to our job portal for Persons with Disabilities (PWDs).  
          Your privacy is our priority, and we are committed to protecting your personal data in compliance with applicable laws.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li><strong>Personal Information:</strong> Name, email, contact details, disability status (optional), and job preferences.</li>
          <li><strong>Employment Data:</strong> Resume, skills, work experience, and job application history.</li>
          <li><strong>Usage Information:</strong> IP address, device type, and browsing activity on our platform.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">2. How We Use Your Information</h2>
        <p className="text-gray-700">We use collected data for the following purposes:</p>
        <ol className="list-decimal pl-6 text-gray-700 mb-4">
          <li>Facilitating job matches between PWD job seekers and inclusive employers.</li>
          <li>Improving platform accessibility and user experience.</li>
          <li>Ensuring compliance with labor laws and equal opportunity policies.</li>
          <li>Providing customer support and responding to inquiries.</li>
        </ol>

        <h2 className="text-xl font-semibold mt-6">3. Data Protection & Security</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>All user data is stored on secure servers.</li>
          <li>Access to sensitive data is restricted to authorized personnel only.</li>
          <li>We do not sell or share personal information with third parties without your consent.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">4. User Responsibilities</h2>
        <p className="text-gray-700">By using our platform, you agree to:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Provide accurate and truthful information in your profile and applications.</li>
          <li>Maintain the confidentiality of your login credentials.</li>
          <li>Use the platform ethically and legally for job search purposes only.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">5. Employer Responsibilities</h2>
        <p className="text-gray-700">Employers registered on our platform must:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Ensure non-discriminatory hiring practices and provide equal opportunities.</li>
          <li>Respect applicant&apos;s privacy and use their data only for recruitment purposes.</li>
          <li>Comply with labor laws regarding workplace accessibility and accommodations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">6. Your Rights</h2>
        <p className="text-gray-700">As a user, you have the right to:</p>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
          <li>Request access, modification, or deletion of your personal data.</li>
          <li>Withdraw consent for data processing at any time.</li>
          <li>Report any privacy violations to our support team.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">7. Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy periodically. Continued use of the platform signifies acceptance of any changes.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Contact Us</h2>
        <p className="text-gray-700">
          If you have any concerns or questions about your privacy, please contact us at:  
          <strong>support@disabilitycareers.com</strong>
        </p>

        <div className="mt-6 text-center">
          <Link
            to="/sign-up"
            className="text-yellow-600 hover:underline font-semibold"
          >
            Back to Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
