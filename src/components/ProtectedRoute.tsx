import { ReactNode, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
  adminOnly?: boolean;
  userOnly?: boolean;
};

function ProtectedRoute({
  children,
  adminOnly = false,
  userOnly = false,
}: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("login");
    } else if (adminOnly && !isAdmin) {
      navigate("/");
    } else if (userOnly && isAdmin) {
      navigate("/app");
    }
  }, [isLoggedIn, navigate, adminOnly, isAdmin, userOnly]);

  if (
    isLoggedIn &&
    ((adminOnly && isAdmin) ||
      (userOnly && !isAdmin) ||
      (!adminOnly && !userOnly))
  ) {
    return children;
  }
}

export default ProtectedRoute;
