import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Player, { IPlayer } from "../models/player";
import Tournament from "../models/tournaments";
import ITournament from "../models/ITournament";

const MONGO_URI = "mongodb://localhost:27017/valorantdb";

type TipoJson = {
  players: IPlayer[],
  tournaments: ITournament[],
}

async function importData() {
  try {
    const filePath = path.join(__dirname, "../../jugadores_actualizado.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const data: TipoJson = JSON.parse(rawData);

    console.log(data.players[0]);

    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // Limpiar colecciones
    await Player.deleteMany({});
    await Tournament.deleteMany({});
    console.log("🧹 Colecciones limpiadas");

    // Insertar jugadores SIN _id
    const cleanedPlayers = data.players.map(({ id, ...rest }) => ({
      ...rest,
      playerId: id // renombramos el id de tu JSON
    }));
    console.log(cleanedPlayers[0]);
    await Player.insertMany(cleanedPlayers);

    // Insertar torneos
    await Tournament.insertMany(data.tournaments);

    console.log("📦 Datos insertados correctamente");
    await mongoose.connection.close();
    console.log("🔌 Conexión cerrada");
  } catch (error) {
    console.error("❌ Error al importar datos:", error);
    process.exit(1);
  }
}


importData();
