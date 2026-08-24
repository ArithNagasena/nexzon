/**
 * Route guard for the console.
 *
 * Sends anyone without a staff session to the login page and remembers where
 * they were headed, so signing in lands them on the page they asked for rather
 * than the dashboard.
 */
import { Navigate, useLocation } from "react-router-dom";
import { isSignedIn } from "@/data/admin/auth";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (!isSignedIn()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default RequireAdmin;
