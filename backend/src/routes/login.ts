import express from "express";
import * as ctrl from "../controllers/loginController";
import { withUser } from "../utils/middleware";

const router = express.Router();

router.post("/login", ctrl.login);
router.post("/register", ctrl.register);
router.get("/login/me", withUser, ctrl.getMe);
router.post("/login/logout", ctrl.logout);

export default router;