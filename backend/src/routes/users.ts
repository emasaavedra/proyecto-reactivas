import express from "express";
import { withUser } from "../utils/middleware";
import User from "../models/user";
import Player from "../models/player";

const usersRouter = express.Router();

usersRouter.post("/me/players", withUser, async (req, res) => {
  const userId = req.userId;
  const { players } = req.body;  // Lista de _id de MongoDB
  console.log("Players recibidos:", players);
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  // Agregar nuevos jugadores (sin duplicados por _id)
  const existingIds = new Set(user.myPlayers.map(id => id.toString()));
  const newPlayerIds = players.filter((id: string) => !existingIds.has(id));
  
  user.myPlayers = [...user.myPlayers, ...newPlayerIds];
  user.cards = user.myPlayers.length;
  
  await user.save();

  res.json({ 
    success: true, 
    myPlayers: user.myPlayers,
    cards: user.cards 
  });
});


usersRouter.get("/me/players", withUser, async (req, res) => {
  const userId = req.userId;
  console.log("userId recibido:", userId);
  const user = await User.findById(userId).populate("myPlayers");
  console.log(user);
  if (!user) return res.status(404).json({ error: "User not found" });
  console.log("Estoy devolviendo mis players :D");
  console.log("Mis Players", user.myPlayers);
  res.json({ players: user.myPlayers });
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

usersRouter.delete("/me/players", withUser, async (req, res) => {
  const userId = req.userId;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.myPlayers = [];
  await user.save();

  res.json({ success: true, message: "Players removed", myPlayers: [] });
});


export default usersRouter;