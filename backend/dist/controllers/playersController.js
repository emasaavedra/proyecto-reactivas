"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlayer = exports.updatePlayer = exports.createPlayer = exports.getPlayerById = exports.listarPlayers = void 0;
const player_1 = __importDefault(require("../models/player"));
const listarPlayers = async (req, res, next) => {
    const players = await player_1.default.find();
    res.json(players);
};
exports.listarPlayers = listarPlayers;
const getPlayerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const player = await player_1.default.findById(id);
        if (!player)
            return res.status(404).json({ error: "No player found with that id" });
        res.json(player);
    }
    catch (err) {
        next(err);
    }
};
exports.getPlayerById = getPlayerById;
const createPlayer = async (req, res, next) => {
    try {
        const p = new player_1.default(req.body);
        const saved = await p.save();
        res.status(201).json(saved);
    }
    catch (err) {
        next(err);
    }
};
exports.createPlayer = createPlayer;
const updatePlayer = async (req, res, next) => {
    try {
        const updated = await player_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated)
            return res.status(404).json({ error: "Player not found" });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
};
exports.updatePlayer = updatePlayer;
const deletePlayer = async (req, res, next) => {
    try {
        const deleted = await player_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ error: "Player not found" });
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
};
exports.deletePlayer = deletePlayer;
