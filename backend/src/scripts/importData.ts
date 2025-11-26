import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Player, { IPlayer } from "../models/player";
import Tournament from "../models/tournaments";
import ITournament from "../models/ITournament";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/valorantdb";

type TipoJson = {
players: IPlayer[],
tournaments: ITournament[],
}

async function importData() {
try {
const filePath = path.join(__dirname, "../../jugadores_actualizado.json");
const rawData = fs.readFileSync(filePath, "utf8");
const data: TipoJson = JSON.parse(rawData);

console.log("Primer jugador JSON:", data.players[0]);

await mongoose.connect(MONGO_URI);
console.log("✅ Conectado a MongoDB");

// Eliminar índices problemáticos
try {
  await Player.collection.dropIndex("id_1");
  console.log("🗑️ Índice 'id_1' de players eliminado");
} catch (e) {
  console.log("ℹ️ Índice 'id_1' de players no existía");
}

try {
  await Tournament.collection.dropIndex("id_1");
  console.log("🗑️ Índice 'id_1' de tournaments eliminado");
} catch (e) {
  console.log("ℹ️ Índice 'id_1' de tournaments no existía");
}

// Limpiar colecciones
await Player.deleteMany({});
await Tournament.deleteMany({});
console.log("🧹 Colecciones limpiadas");

// Insertar jugadores, sin preocuparse por _id
const cleanedPlayers = data.players.map(({ id, ...rest }) => ({
  ...rest,
  playerId: id // guardamos el ID original
}));

// 1️⃣ Insertar jugadores
const insertedPlayers = await Player.insertMany(cleanedPlayers);

// 2️⃣ Crear mapping id viejo → _id Mongo
const oldToNewIdMap: Record<number, mongoose.Types.ObjectId> = {};
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
await Tournament.insertMany(cleanedTournaments);


console.log("📦 Datos insertados correctamente");
await mongoose.connection.close();
console.log("🔌 Conexión cerrada");


} catch (error) {
console.error("❌ Error al importar datos:", error);
process.exit(1);
}
}

importData();
