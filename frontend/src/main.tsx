import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Home from "./routes/Home.tsx";
import Packs from "./routes/Packs.tsx";
import MyTeam from "./routes/MyTeam.tsx";
import Leaderboard from "./routes/Leaderboard.tsx";
import Profile from "./routes/Profile.tsx";
import Player_list from "./Player_list.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/packs", element: <Packs /> },
      { path: "/team", element: <MyTeam /> },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/players", element: <Player_list /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
