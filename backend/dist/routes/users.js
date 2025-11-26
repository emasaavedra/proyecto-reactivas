"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const user_1 = __importDefault(require("../models/user"));
const usersRouter = express_1.default.Router();
usersRouter.post("/me/players", middleware_1.withUser, async (req, res) => {
    const userId = req.userId;
    const { players } = req.body; // Lista de _id de MongoDB
    console.log("Players recibidos:", players);
    const user = await user_1.default.findById(userId);
    if (!user)
        return res.status(404).json({ error: "User not found" });
    // Limpiar valores null del array existente
    user.myPlayers = user.myPlayers.filter(id => id != null);
    // Agregar nuevos jugadores (sin duplicados por _id)
    const existingIds = new Set(user.myPlayers.map(id => id.toString()));
    const newPlayerIds = players.filter((id) => id && !existingIds.has(id));
    user.myPlayers = [...user.myPlayers, ...newPlayerIds];
    user.cards = user.myPlayers.length;
    await user.save();
    res.json({
        success: true,
        myPlayers: user.myPlayers,
        cards: user.cards
    });
});
usersRouter.get("/me/players", middleware_1.withUser, async (req, res) => {
    const userId = req.userId;
    console.log("userId recibido:", userId);
    const user = await user_1.default.findById(userId).populate("myPlayers");
    console.log(user);
    if (!user)
        return res.status(404).json({ error: "User not found" });
    // Limpiar valores null del array
    user.myPlayers = user.myPlayers.filter(id => id != null);
    await user.save();
    console.log("Estoy devolviendo mis players :D");
    console.log("Mis Players", user.myPlayers);
    res.json({ players: user.myPlayers });
});
usersRouter.get("/", async (req, res) => {
    const users = await user_1.default.find({});
    res.json(users);
});
usersRouter.delete("/me/players", middleware_1.withUser, async (req, res) => {
    const userId = req.userId;
    const user = await user_1.default.findById(userId);
    if (!user)
        return res.status(404).json({ error: "User not found" });
    user.myPlayers = [];
    await user.save();
    res.json({ success: true, message: "Players removed", myPlayers: [] });
});
usersRouter.patch("/me/favorite-team", middleware_1.withUser, async (req, res) => {
    const userId = req.userId;
    const { favoriteTeam } = req.body;
    const user = await user_1.default.findById(userId);
    if (!user)
        return res.status(404).json({ error: "User not found" });
    user.favoriteTeam = favoriteTeam;
    await user.save();
    res.json({ success: true, favoriteTeam: user.favoriteTeam });
});
exports.default = usersRouter;
