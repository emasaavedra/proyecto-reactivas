"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config/config")); // ← NUEVO
const players_1 = __importDefault(require("./routes/players"));
const login_1 = __importDefault(require("./routes/login")); // ← NUEVO
const users_1 = __importDefault(require("./routes/users"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const tournaments_1 = __importDefault(require("./routes/tournaments"));
const path_1 = __importDefault(require("path"));
const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    console.error(error.name);
    if (error.name === "CastError") {
        response.status(400).send({ error: "malformatted id" });
    }
    else if (error.name === "ValidationError") {
        response.status(400).json({ error: error.message });
    }
    next(error);
};
const app = (0, express_1.default)();
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? [`https://fullstack.dcc.uchile.cl:${config_1.default.PORT}`]
    : ["http://localhost:5173"];
app.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static('dist')); // Servir archivos estáticos del frontend
async function startServer() {
    try {
        await mongoose_1.default.connect(config_1.default.MONGODB_URI);
        console.log("Connected to MongoDB");
        app.use("/api", players_1.default);
        app.use("/api", login_1.default);
        app.use("/api/", tournaments_1.default);
        app.use("/api/users", users_1.default);
        app.get("/", (req, res) => {
            res.send("<h1>Servidor funcionando correctamente :D</h1>");
        });
        app.use(errorHandler);
        app.get('*', (req, res) => {
            res.sendFile(path_1.default.resolve(__dirname, '../dist', 'index.html'));
        });
        app.listen(config_1.default.PORT, () => {
            console.log(`Server running on http://localhost:${config_1.default.PORT}`);
        });
    }
    catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}
startServer();
