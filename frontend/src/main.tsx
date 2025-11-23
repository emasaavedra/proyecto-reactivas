import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Home from "./routes/Home.tsx";
import Packs from "./routes/Packs.tsx";
import MyTeam from "./routes/MyTeam.tsx";
import Leaderboard from "./routes/Leaderboard.tsx";
import Profile from "./routes/Profile.tsx";
import Login from "./routes/Login";
import Player_list from "./Player_list.tsx";
import Tournament_list from "./Tournament_list.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Rutas públicas (accesibles sin login)
      { path: "/", element: <Home /> },
      { 
        path: "/login", 
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ) 
      },
      
      // Rutas públicas de visualización
      { path: "/players", element: <Player_list /> },
      { path: "/tournaments", element: <Tournament_list /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      
      // Rutas protegidas (requieren autenticación)
      { 
        path: "/packs", 
        element: (
          <ProtectedRoute>
            <Packs />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/team", 
        element: (
          <ProtectedRoute>
            <MyTeam />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "/profile", 
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ) 
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
