import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import AdminPanel from "./pages/AdminPanel";
import ApplicantPage from "./pages/ApplicantPage";
import AppliedJobs from "./pages/AppliedJobs";
import EditProfileInfoPage from "./pages/EditProfileInfoPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import EmployerApplicantsPage from "./pages/EmployerApplicantsPage";
import EmployerJobPage from "./pages/EmployerJobPage";
import EmployerPage from "./pages/EmployerPage";
import ForgotPassword from "./pages/ForgotPassword";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobPost from "./pages/JobPost";
import JobsPage from "./pages/JobsPage";
import LoginPage from "./pages/LoginPage";
import MessagingPage from "./pages/MessagingPage";
import ProfileInfoPage from "./pages/ProfileInfoPage";
import ResetPassword from "./pages/ResetPassword";
import SignUpPage from "./pages/SignUpPage";
import UserData from "./pages/UserData";
import VideoChatRoom from "./pages/VideoChatRoom";
import { authStore } from "./stores/authStore";
import AdminUserList from "./pages/AdminUserList";
import UserBan from "./pages/UserBan";
import AdminDashboard from "./pages/AdminDashboard";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = authStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/" replace />;
  }

  if (user?.banned) {
    return <Navigate to="/ban" replace />;
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
    if (user.role === "Admin") {
      return <Navigate to="/admin" replace />;
    }
  }
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, onlineUsers } = authStore();

  console.log("Online Users: ", onlineUsers);

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
          path="/post-job"
          element={
            <ProtectedRoute>
              <EmployerJobPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicant-list"
          element={
            <ProtectedRoute>
              <EmployerApplicantsPage />
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
          path="/job"
          element={
            <ProtectedRoute>
              <AppliedJobs />
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
        <Route
          path="/user/:userId"
          element={
            <ProtectedRoute>
              <UserData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-details/:jobId"
          element={
            <ProtectedRoute>
              <JobDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employer/job-post"
          element={
            <ProtectedRoute>
              <JobPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messaging"
          element={
            <ProtectedRoute>
              <MessagingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/videoRoom"
          element={
            <ProtectedRoute>
              <VideoChatRoom />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfileInfoPage />
            </ProtectedRoute>
          }
        />

<Route path="/admin" element={<AdminPanel />}>
    <Route index element={<AdminDashboard />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="AdminUserList" element={<AdminUserList />} />
  </Route>

        <Route
          path="/ban"
          element={ 
              <UserBan />
          }
        />

        
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
