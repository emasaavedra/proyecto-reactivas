import mongoose from "mongoose";
import Player from "./models/player";
const data = require("../jugadores_actualizado.json");
const { players } = data;

async function importData() {
  try {
    await mongoose.connect("mongodb://localhost:27017/valorant");
    console.log("✅ Conectado a MongoDB");

    // opcional: borrar colección antes
    await Player.deleteMany({});

    await Player.insertMany(players);
    console.log(`✅ ${players.length} jugadores importados`);

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error importando datos:", error);
  }
}

importData();
