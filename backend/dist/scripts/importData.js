"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const player_1 = __importDefault(require("../models/player"));
const tournaments_1 = __importDefault(require("../models/tournaments"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/valorantdb";
async function importData() {
    try {
        const filePath = path_1.default.join(__dirname, "../../jugadores_actualizado.json");
        const rawData = fs_1.default.readFileSync(filePath, "utf8");
        const data = JSON.parse(rawData);
        console.log("Primer jugador JSON:", data.players[0]);
        await mongoose_1.default.connect(MONGO_URI);
        console.log("✅ Conectado a MongoDB");
        // Eliminar índices problemáticos
        try {
            await player_1.default.collection.dropIndex("id_1");
            console.log("🗑️ Índice 'id_1' de players eliminado");
        }
        catch (e) {
            console.log("ℹ️ Índice 'id_1' de players no existía");
        }
        try {
            await tournaments_1.default.collection.dropIndex("id_1");
            console.log("🗑️ Índice 'id_1' de tournaments eliminado");
        }
        catch (e) {
            console.log("ℹ️ Índice 'id_1' de tournaments no existía");
        }
        // Limpiar colecciones
        await player_1.default.deleteMany({});
        await tournaments_1.default.deleteMany({});
        console.log("🧹 Colecciones limpiadas");
        // Insertar jugadores, sin preocuparse por _id
        const cleanedPlayers = data.players.map(({ id, ...rest }) => ({
            ...rest,
            playerId: id // guardamos el ID original
        }));
        // 1️⃣ Insertar jugadores
        const insertedPlayers = await player_1.default.insertMany(cleanedPlayers);
        // 2️⃣ Crear mapping id viejo → _id Mongo
        const oldToNewIdMap = {};
        insertedPlayers.forEach((player, i) => {
            const { playerId } = cleanedPlayers[i];
            if (playerId !== undefined) {
                oldToNewIdMap[Number(playerId)] = player._id;
            }
        });
        // 3️⃣ Actualizar torneos con los nuevos _id
        const cleanedTournaments = data.tournaments.map(t => ({
            ...t,
            players: t.players.map(oldId => oldToNewIdMap[oldId])
        }));
        // 4️⃣ Insertar torneos
        await tournaments_1.default.insertMany(cleanedTournaments);
        console.log("📦 Datos insertados correctamente");
        await mongoose_1.default.connection.close();
        console.log("🔌 Conexión cerrada");
    }
    catch (error) {
        console.error("❌ Error al importar datos:", error);
        process.exit(1);
    }
}
importData();
