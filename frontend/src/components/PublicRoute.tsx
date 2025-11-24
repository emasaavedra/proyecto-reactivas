import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import authService from "../services/login";
import type { User } from "../types/User";

interface PublicRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function PublicRoute({ children, redirectTo = "/" }: PublicRouteProps) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.restoreLogin();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "60vh" 
      }}>
        <p>Cargando...</p>
      </div>
    );
  }

  // Si ya está autenticado, redirigir a la ruta especificada
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si no está autenticado, manda al login
  return <>{children}</>;
}
