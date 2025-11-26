"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCSRF = exports.withUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const withUser = (req, res, next) => {
    // Busca el token en la cookie
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: "Token not found" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        req.userId = decoded.id;
        req.csrfToken = decoded.csrf;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
};
exports.withUser = withUser;
const checkCSRF = (req, res, next) => {
    const csrfFromHeader = req.headers["x-csrf-token"];
    if (!csrfFromHeader || csrfFromHeader !== req.csrfToken) {
        return res.status(403).json({ error: "Invalid CSRF token" });
    }
    next();
};
exports.checkCSRF = checkCSRF;
