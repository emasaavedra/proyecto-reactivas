import { Link } from "react-router-dom";
import { Box, Button, Card, CardContent, Typography, Grid } from "@mui/material";
import StyleIcon from "@mui/icons-material/Style";
import GroupsIcon from "@mui/icons-material/Groups";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

export default function Home() {
  return (
    <Box sx={{ maxWidth: 700, margin: "2rem auto", padding: "0 1rem" }}>
      <Card 
        elevation={2}
        sx={{ 
          backgroundColor: "#1a1a2e",
          color: "#ffffff",
          borderRadius: 2
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              textAlign: "center", 
              mb: 2,
              fontWeight: "bold",
              color: "#ffffff"
            }}
          >
            🃏 Bienvenido a ValoCards 🃏
          </Typography>
          
          <Typography 
            variant="body1" 
            sx={{ 
              textAlign: "center", 
              mb: 3,
              color: "#b8b8d1",
              lineHeight: 1.6
            }}
          >
            Construye el equipo de tus sueños con jugadores profesionales de Valorant. 
            Abre sobres, arma tu equipo y gana puntos a medida que se desarrollan los partidos reales.
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <Button
                component={Link}
                to="/packs"
                variant="contained"
                fullWidth
                size="medium"
                startIcon={<StyleIcon />}
                sx={{
                  py: 1.5,
                  fontSize: "0.95rem",
                  backgroundColor: "#4a5568",
                  "&:hover": {
                    backgroundColor: "#5a6678",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease"
                }}
              >
                Abre un Pack
              </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                component={Link}
                to="/team"
                variant="contained"
                fullWidth
                size="medium"
                startIcon={<GroupsIcon />}
                sx={{
                  py: 1.5,
                  fontSize: "0.95rem",
                  backgroundColor: "#4a5568",
                  "&:hover": {
                    backgroundColor: "#5a6678",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease"
                }}
              >
                Mi Equipo
              </Button>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                component={Link}
                to="/leaderboard"
                variant="contained"
                fullWidth
                size="medium"
                startIcon={<LeaderboardIcon />}
                sx={{
                  py: 1.5,
                  fontSize: "0.95rem",
                  backgroundColor: "#4a5568",
                  "&:hover": {
                    backgroundColor: "#5a6678",
                    transform: "translateY(-2px)",
                  },
                  transition: "all 0.2s ease"
                }}
              >
                Clasificación
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
