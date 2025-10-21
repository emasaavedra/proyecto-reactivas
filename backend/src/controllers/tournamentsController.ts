import { Request, Response, NextFunction } from "express";
import Tournament from "../models/tournaments";

export const listTournaments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tournaments = await Tournament.find().lean();
    res.json(tournaments);
  } catch (err) {
    next(err);
  }
};

export const getTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const t = await Tournament.findById(req.params.id).lean();
    if (!t) return res.status(404).json({ error: "Tournament not found" });
    res.json(t);
  } catch (err) {
    next(err);
  }
};

export const createTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const t = new Tournament(req.body);
    const saved = await t.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

export const updateTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await Tournament.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "Tournament not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteTournament = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Tournament.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Tournament not found" });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
