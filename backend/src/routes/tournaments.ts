import express from "express";
import * as ctrl from "../controllers/tournamentsController";
const tournamentRouter = express.Router();

tournamentRouter.get("/tournaments", ctrl.listTournaments);
tournamentRouter.get("/tournaments/:id", ctrl.getTournament);
tournamentRouter.post("/tournaments/", ctrl.createTournament);
tournamentRouter.put("/tournaments/:id", ctrl.updateTournament);
tournamentRouter.delete("/tournaments/:id", ctrl.deleteTournament);

export default tournamentRouter;
