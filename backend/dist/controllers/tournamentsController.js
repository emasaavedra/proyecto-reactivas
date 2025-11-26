"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTournament = exports.updateTournament = exports.createTournament = exports.getTournament = exports.listTournaments = void 0;
const tournaments_1 = __importDefault(require("../models/tournaments"));
const listTournaments = async (req, res, next) => {
    try {
        const tournaments = await tournaments_1.default.find().lean();
        res.json(tournaments);
    }
    catch (err) {
        next(err);
    }
};
exports.listTournaments = listTournaments;
const getTournament = async (req, res, next) => {
    try {
        const t = await tournaments_1.default.findById(req.params.id).lean();
        if (!t)
            return res.status(404).json({ error: "Tournament not found" });
        res.json(t);
    }
    catch (err) {
        next(err);
    }
};
exports.getTournament = getTournament;
const createTournament = async (req, res, next) => {
    try {
        const t = new tournaments_1.default(req.body);
        const saved = await t.save();
        res.status(201).json(saved);
    }
    catch (err) {
        next(err);
    }
};
exports.createTournament = createTournament;
const updateTournament = async (req, res, next) => {
    try {
        const updated = await tournaments_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated)
            return res.status(404).json({ error: "Tournament not found" });
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
};
exports.updateTournament = updateTournament;
const deleteTournament = async (req, res, next) => {
    try {
        const deleted = await tournaments_1.default.findByIdAndDelete(req.params.id);
        if (!deleted)
            return res.status(404).json({ error: "Tournament not found" });
        res.status(204).end();
    }
    catch (err) {
        next(err);
    }
};
exports.deleteTournament = deleteTournament;
