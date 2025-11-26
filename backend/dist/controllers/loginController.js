"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getMe = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const config_1 = __importDefault(require("../config/config"));
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await user_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "invalid username or password" });
        }
        const passwordCorrect = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!passwordCorrect) {
            return res.status(401).json({ error: "invalid username or password" });
        }
        const userForToken = {
            username: user.username,
            csrf: crypto.randomUUID(),
            id: user._id,
        };
        const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.JWT_SECRET);
        res.setHeader("X-CSRF-Token", userForToken.csrf);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 60 * 60 * 1000,
        });
        // Usar toJSON para serializar correctamente
        const userResponse = user.toJSON();
        res.status(200).send(userResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// Register
const register = async (req, res, next) => {
    try {
        const { username, name, email, password } = req.body;
        if (!username || !password || !email || !name) {
            return res.status(400).json({ error: "All fields are required" });
        }
        // Verificar si el usuario ya existe
        const existingUser = await user_1.default.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }
        // Hash de la contraseña
        const saltRounds = 10;
        const passwordHash = await bcrypt_1.default.hash(password, saltRounds);
        const newUser = new user_1.default({
            username,
            name,
            email,
            passwordHash,
            cards: 0,
            favoriteTeam: "",
            points: 0,
        });
        const savedUser = await newUser.save();
        // Auto-login después del registro
        const userForToken = {
            username: savedUser.username,
            csrf: crypto.randomUUID(),
            id: savedUser._id.toString(),
        };
        const token = jsonwebtoken_1.default.sign(userForToken, config_1.default.JWT_SECRET, {
            expiresIn: 60 * 60,
        });
        res.setHeader("X-CSRF-Token", userForToken.csrf);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            maxAge: 60 * 60 * 1000,
        });
        // Usar toJSON para serializar correctamente
        const userResponse = savedUser.toJSON();
        res.status(201).json(userResponse);
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
// Get current user
const getMe = async (req, res, next) => {
    try {
        const user = await user_1.default.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
// Logout
const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};
exports.logout = logout;
