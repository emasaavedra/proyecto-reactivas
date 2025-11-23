import express from "express";
import { withUser } from "../utils/middleware";
import User from "../models/user";
import Player from "../models/player";

const usersRouter = express.Router();

usersRouter.post("/me/players", withUser, async (req, res) => {
  const userId = req.userId;
  const { players } = req.body;
  if (!Array.isArray(players)) return res.status(400).json({ error: "Players array required" });

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.myPlayers = Array.from(new Set([...(user.myPlayers || []), ...players]));
  await user.save();

  res.json({ success: true, myPlayers: user.myPlayers });
});

usersRouter.get("/me/players", withUser, async (req, res) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate("myPlayers");
  if (!user) return res.status(404).json({ error: "User not found" });

  res.json({ players: user.myPlayers });
});
/**
usersRouter.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
 */
export default usersRouter;