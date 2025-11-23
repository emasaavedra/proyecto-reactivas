import express from "express";
import { withUser } from "../utils/middleware";
import User from "../models/user";
import Player from "../models/player";

const usersRouter = express.Router();

usersRouter.post("/me/players", withUser, async (req, res) => {
  const userId = req.userId;
  const { players } = req.body;  // Lista de ids del JSON, ej: [3672, 1200, 3672]
  console.log(players);
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  if (!user) return res.status(404).json({ error: "User not found" });

  user.myPlayers = Array.from(new Set([...(user.myPlayers || []), ...players]));
  await user.save();

  res.json({ success: true, myPlayers: user.myPlayers });
});


usersRouter.get("/me/players", withUser, async (req, res) => {
  const userId = req.userId;
  console.log("userId recibido:", userId);
  const user = await User.findById(userId);
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