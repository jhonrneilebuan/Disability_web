
import { Navigate } from "react-router-dom";
import { useState } from "react";

const UserBan = () => {
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  if (redirectToLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <h1>You are banned from accessing this page.</h1>
      <p>Please contact support if you believe this is an error.</p>
      <button onClick={() => setRedirectToLogin(true)}>
        Go to Login Page
      </button>
    </div>
  );
};

export default UserBan;