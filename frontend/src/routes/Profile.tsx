import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/login";
import type { User } from "../types/User";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Forzar recarga desde el servidor en cada visita
    authService.restoreLogin().then(currentUser => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
  }, [navigate, refreshKey]);

  if (!user) {
    return (
      <section className="card">
        <h1>Cargando...</h1>
      </section>
    );
  }

  const handleRefresh = async () => {
    const updatedUser = await authService.restoreLogin();
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

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
      <div style={{ display: "flex", gap: "10px" }}>
        <button className="btn" onClick={handleRefresh}>🔄 Actualizar</button>
        <button className="btn">Editar Perfil</button>
      </div>
    </section>
  );
}
