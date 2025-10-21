import { Request, Response, NextFunction } from "express";
import Player from "../models/player";

export const listarPlayers = async (req: Request, res: Response, next: NextFunction) => {
    const players = await Player.find().lean();
    res.json(players);
};

export const getPlayerById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const playerId = Number(req.params.id);
    const players = await Player.find({ id: playerId }).lean();
    if (!players.length) return res.status(404).json({ error: "No players found with that id" });
    res.json(players);
  } catch (err) {
    next(err);
  }
};


export const createPlayer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const p = new Player(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const updatePlayer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Player not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deletePlayer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Player.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Player not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
