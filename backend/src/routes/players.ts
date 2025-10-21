import express from "express";
import * as ctrl from "../controllers/playersController";

const router = express.Router();

router.get("/players/:id", ctrl.getPlayerById);
router.get("/players", ctrl.listarPlayers);
router.post("/players", ctrl.createPlayer);
router.put("/players/:id", ctrl.updatePlayer);
router.delete("/players/:id", ctrl.deletePlayer);

export default router;
