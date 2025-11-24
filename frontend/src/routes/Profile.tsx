import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/login";
import type { User } from "../types/User";
import { updateFavoriteTeam } from "../services/userService";
import usePlayerState from "../stores/State";
import { 
  Button, Card, CardContent, Typography, Box, Divider, Chip,
  Dialog, DialogTitle, DialogContent, List, ListItem, ListItemButton, ListItemText
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import StyleIcon from "@mui/icons-material/Style";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openTeamDialog, setOpenTeamDialog] = useState(false);
  const navigate = useNavigate();
  const players = usePlayerState(state => state.players);
  const fetchPlayers = usePlayerState(state => state.fetchPlayers);

  useEffect(() => {
    // Forzar recarga desde el servidor en cada visita
    authService.restoreLogin().then(currentUser => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });
    
    // Cargar jugadores para obtener equipos
    if (players.length === 0) {
      fetchPlayers();
    }
  }, [navigate, refreshKey, players.length, fetchPlayers]);

  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
        <Typography variant="h5">Cargando...</Typography>
      </Box>
    );
  }

  const handleRefresh = async () => {
    const updatedUser = await authService.restoreLogin();
    if (updatedUser) {
      setUser(updatedUser);
    }
  };

  const handleSelectTeam = async (teamName: string) => {
    try {
      await updateFavoriteTeam(teamName);
      
      // Actualizar el usuario local
      const updatedUser = await authService.restoreLogin();
      if (updatedUser) {
        setUser(updatedUser);
        // Actualizar localStorage
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        // Disparar evento para actualizar navbar
        window.dispatchEvent(new Event("userUpdated"));
      }
      
      setOpenTeamDialog(false);
    } catch (error) {
      console.error("Error al actualizar equipo favorito:", error);
    }
  };

  // Obtener lista única de equipos
  const uniqueTeams = Array.from(new Set(players.map(p => p.team).filter(Boolean))).sort();

  return (
    <Box sx={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}>
      <Card elevation={3} sx={{ backgroundColor: "#1a1a2e", color: "#ffffff" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center", mb: 3 }}>
            👤 Tu Perfil
          </Typography>
          
          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <PersonIcon color="primary" />
              <Typography variant="body1">
                <strong>Usuario:</strong> {user.username}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EmailIcon color="primary" />
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <StyleIcon color="primary" />
              <Typography variant="body1">
                <strong>Cartas:</strong>
              </Typography>
              <Chip label={user.cards} color="primary" />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <EmojiEventsIcon color="primary" />
              <Typography variant="body1">
                <strong>Puntos:</strong>
              </Typography>
              <Chip label={user.points} color="success" />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <GroupsIcon color="primary" />
              <Typography variant="body1">
                <strong>Equipo Favorito:</strong> {user.favoriteTeam || "—"}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button 
              variant="contained" 
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              sx={{ 
                backgroundColor: "#3498db",
                "&:hover": { backgroundColor: "#2980b9" }
              }}
            >
              Actualizar
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<GroupsIcon />}
              onClick={() => setOpenTeamDialog(true)}
              sx={{ 
                color: "#ffffff",
                borderColor: "#3498db",
                "&:hover": { borderColor: "#2980b9", backgroundColor: "rgba(52, 152, 219, 0.1)" }
              }}
            >
              Escoger Equipo
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Dialog para seleccionar equipo */}
      <Dialog 
        open={openTeamDialog} 
        onClose={() => setOpenTeamDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ backgroundColor: "#1a1a2e", color: "#ffffff" }}>
          Selecciona tu Equipo Favorito
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#16213e", color: "#ffffff", p: 0 }}>
          <List>
            {uniqueTeams.map((team, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton 
                  onClick={() => handleSelectTeam(team)}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(52, 152, 219, 0.2)" },
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
                  }}
                >
                  <ListItemText 
                    primary={team}
                    sx={{ color: "#ffffff" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
