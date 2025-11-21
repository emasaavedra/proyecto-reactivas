import axios from "axios";
import type { User } from "../types/User";

const baseUrl = "http://localhost:3001/api";

// Configurar axios para enviar cookies
axios.defaults.withCredentials = true;

type Credentials = {
    username: string;
    password: string;
};

const login = async (credentials: Credentials): Promise<User | null> => {
    try {
        const response = await axios.post(`${baseUrl}/login`, credentials);
        
        // Guardar CSRF token del header
        const csrfToken = response.headers["x-csrf-token"];
        if (csrfToken) {
            localStorage.setItem("csrfToken", csrfToken);
        }
        
        // Guardar info del usuario
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
};

const restoreLogin = async (): Promise<User | null> => {
    try {
        const response = await axios.get(`${baseUrl}/login/me`);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response.data;
    } catch {
        // Si falla, limpiar storage
        localStorage.removeItem("currentUser");
        localStorage.removeItem("csrfToken");
        return null;
    }
};

const logout = async (): Promise<void> => {
    try {
        await axios.post(`${baseUrl}/login/logout`);
    } catch (error) {
        console.error("Error during logout:", error);
    } finally {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("csrfToken");
    }
};

const register = async (username: string, name: string, email: string, password: string): Promise<User | null> => {
    try {
        const response = await axios.post(`${baseUrl}/register`, {
            username,
            name,
            email,
            password
        });
        
        const csrfToken = response.headers["x-csrf-token"];
        if (csrfToken) {
            localStorage.setItem("csrfToken", csrfToken);
        }
        
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error("Error during registration:", error);
        return null;
    }
};

export default { 
    login, 
    restoreLogin, 
    logout, 
    register 
};