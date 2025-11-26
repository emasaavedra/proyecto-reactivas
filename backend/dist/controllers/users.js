"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.post("/", async (request, response) => {
    const { username, name, password } = request.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
    const user = new user_1.default({
        username,
        name,
        passwordHash,
    });
    const savedUser = await user.save();
    response.status(201).json(savedUser);
});
router.get("/", async (req, res) => {
    const users = await user_1.default.find({});
    res.json(users);
});
exports.default = router;
