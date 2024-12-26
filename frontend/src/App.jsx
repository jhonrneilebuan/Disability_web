import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { authStore } from "./stores/authStore";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import ApplicantPage from "./pages/ApplicantPage";
import EmployerPage from "./pages/EmployerPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Loading from "./components/Loading";
import ProfileInfoPage from "./pages/ProfileInfoPage";
import JobsPage from "./pages/JobsPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = authStore();

  if (isAuthenticated && user.isVerified) {
    if (user.role === "Applicant") {
      return <Navigate to="/applicant" replace />;
    }
    if (user.role === "Employer") {
      return <Navigate to="/employer" replace />;
    }
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loading />;

  return (
    <div>
      <Routes>
        <Route
          path="/applicant"
          element={
            <ProtectedRoute>
              <ApplicantPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile-info"
          element={
            <ProtectedRoute>
              <ProfileInfoPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employer"
          element={
            <ProtectedRoute>
              <EmployerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
