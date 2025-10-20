import express, { Request, Response } from "express";
import path from "path";
import IPlayer from "./models/IPlayer";
import Player from "./models/Player";
import ITournament from "./models/ITournament";
const data = require("../jugadores_actualizado.json") as { players: IPlayer[]; tournaments: ITournament[] };

const { players, tournaments } = data;

const app = express();

app.use(express.json());
app.use(express.static("dist"));
app.use("/photos", express.static(path.join(__dirname, "../../jugadores_fotos")));

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
});

app.get("/api/players", (req: Request, res: Response) => {
  res.json(players);
});

// Buscar jugadores por id
app.get("/api/players/:id", (request, response) => {
    const playerId = Number(request.params.id);
    const player = players.find((p) => p.id === playerId);

    if (player) {
        response.json(player);
    } else {
        response.status(404).end();
    }
});
// Buscar jugadores por Nombre
app.get("/api/players/name/:name", (request, response) => {
    const name = request.params.name;
    const player = players.find((p) => p.name === name);

    if (player) {
        response.json(player);
    } else {
        response.status(404).end();
    }
});

app.get("/api/tournaments", (req: Request, res: Response) => {
  res.json(tournaments);
});

// Buscar fotos por nombre del archivo
// se puede obtener el nombre desde el atributo 'photo' de cada player
app.get("/api/photos/:filename", (req: Request, res: Response) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "../../jugadores_fotos", filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "Foto no encontrada" });
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
