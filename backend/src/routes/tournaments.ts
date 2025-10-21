import express from "express";
import * as ctrl from "../controllers/tournamentsController";
const router = express.Router();

router.get("/api/tournaments", ctrl.listTournaments);
router.get("/api/tournaments/:id", ctrl.getTournament);
router.post("/api/tournaments/", ctrl.createTournament);
router.put("/api/tournaments/:id", ctrl.updateTournament);
router.delete("/api/tournaments/:id", ctrl.deleteTournament);

export default router;
