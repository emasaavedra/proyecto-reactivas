import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/login";
import type { User } from "../types/User";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.restoreLogin();
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  if (!user) {
    return (
      <section className="card">
        <h1>Cargando...</h1>
      </section>
    );
  }

  return (
    <section className="card">
      <h1>Tu Perfil</h1>
      <ul className="meta">
        <li><strong>Nombre:</strong> {user.username}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Cartas:</strong> {user.cards}</li>
        <li><strong>Puntos:</strong> {user.points}</li>
        <li><strong>Equipo Favorito:</strong> {user.favoriteTeam || "—"}</li>
      </ul>
      <button className="btn">Editar Perfil</button>
    </section>
  );
}
