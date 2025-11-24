import { useState, useEffect } from "react";
import authService from "../services/login";
import type { User } from "../types/User";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const currentUser = await authService.restoreLogin();
      setUser(currentUser);
    } catch (err) {
      setError("Error al verificar autenticación");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await authService.login({ username, password });
      if (loggedUser) {
        setUser(loggedUser);
        return { success: true, user: loggedUser };
      } else {
        setError("Credenciales incorrectas");
        return { success: false, error: "Credenciales incorrectas" };
      }
    } catch (err) {
      const errorMsg = "Error al iniciar sesión";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await authService.register(username, name, email, password);
      if (newUser) {
        setUser(newUser);
        return { success: true, user: newUser };
      } else {
        setError("Error al registrar usuario");
        return { success: false, error: "Error al registrar usuario" };
      }
    } catch (err) {
      const errorMsg = "Error al registrar usuario";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      setError("Error al cerrar sesión");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    isAuthenticated: !!user
  };
}
