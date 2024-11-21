import ForgotPassword from "../pages/onboarding/ForgotPassword";
import Login from "../pages/onboarding/Login";
import VerifyOtp from "../pages/onboarding/VerifyOtp";
import UpdatePassword from "../pages/onboarding/UpdatePassword";

export const authRoutes = [
  {
    title: "Login",
    url: "/login",
    page: <Login />,
  },
  {
    title: "Forgot Password",
    url: "/forgot-password",
    page: <ForgotPassword />,
  },
  {
    title: "Verify Otp",
    url: "/verify-otp",
    page: <VerifyOtp />,
  },
  {
    title: "Update Password",
    url: "/update-password",
    page: <UpdatePassword />,
  },
];
