import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginService from "../services/login";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = await loginService.login({ username, password });
      if (user) {
        navigate("/");
        window.location.reload();
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error durante login:", error);
      alert("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const user = await loginService.register(username, name, email, password);
      if (user) {
        navigate("/");
        window.location.reload();
      } else {
        alert("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error durante registro:", error);
      alert("Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1>{isLogin ? "Iniciar Sesión" : "Registrarse"}</h1>
      <p>
        {isLogin 
          ? "Ingresa a tu cuenta de ValoFantasy" 
          : "Crea una nueva cuenta en ValoFantasy"}
      </p>
      
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ff4655",
            background: "#1a1a1a",
            color: "white"
          }}
        />

        {!isLogin && (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "4px",
                border: "1px solid #ff4655",
                background: "#1a1a1a",
                color: "white"
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
                borderRadius: "4px",
                border: "1px solid #ff4655",
                background: "#1a1a1a",
                color: "white"
              }}
            />
          </>
        )}
        
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem",
            marginBottom: "1rem",
            borderRadius: "4px",
            border: "1px solid #ff4655",
            background: "#1a1a1a",
            color: "white"
          }}
        />
        
        <button 
          className="btn primary" 
          onClick={isLogin ? handleLogin : handleRegister} 
          disabled={loading}
          style={{ width: "100%", marginBottom: "1rem" }}
        >
          {loading ? "Cargando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}
        </button>

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: "none",
            border: "none",
            color: "#00d4ff",
            cursor: "pointer",
            textDecoration: "underline",
            width: "100%"
          }}
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </button>
      </div>
    </section>
  );
}