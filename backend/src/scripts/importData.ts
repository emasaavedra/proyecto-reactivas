import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import Player from "../models/player";
import Tournament from "../models/tournaments";

const MONGO_URI = "mongodb://localhost:27017/valorantdb";

async function importData() {
  try {
    // 1️⃣ Leer el JSON
    const filePath = path.join(__dirname, "../../jugadores_actualizado.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(rawData);

    // 2️⃣ Conectarse a Mongo
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB");

    // 3️⃣ Limpiar colecciones anteriores (opcional)
    await Player.deleteMany({});
    await Tournament.deleteMany({});
    console.log("🧹 Colecciones limpiadas");

    // 4️⃣ Insertar datos
    await Player.insertMany(data.players);
    await Tournament.insertMany(data.tournaments);
    console.log("📦 Datos insertados correctamente");

    // 5️⃣ Cerrar conexión
    await mongoose.connection.close();
    console.log("🔌 Conexión cerrada");
  } catch (error) {
    console.error("❌ Error al importar datos:", error);
    process.exit(1);
  }
}

importData();
