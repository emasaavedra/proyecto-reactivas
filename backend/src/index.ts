import dotenv from "dotenv";
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
//import Player from "./models/player";
import Tournament from "./models/tournaments";
import path from "path";
import IPlayer from "./models/IPlayer";
import { players } from "./models/info";
import { tournaments } from "./models/info";

const app = express();

app.use(express.json());
app.use(express.static("dist"));

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Servidor funcionando correctamente</h1>");
});

app.get("/api/players", async (req: Request, res: Response, next) => {
  res.json(players);
});

// Buscar jugadores por id
app.get("/api/players/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const player = players.find((p) => p.id === id);

  if (player) {
    res.json(player);
  } else {
    res.status(404).json({ error: "Jugador no encontrado" });
  }
});

// Buscar jugadores por Nombre
app.get("/api/players/name/:name", (req, res, next) => {
    const name = req.params.name;
    const player = players.find((p) => p.name === name);

    if (player) {
      res.json(player);
    } else {
      res.status(404).json({ error: "Jugador no encontrado" });
    }
});

// Borrar player por id
app.delete("/api/players/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = players.findIndex((p) => p.id === id);

  if (index !== -1) {
    players.splice(index, 1); // elimina del array
    res.status(204).end();
  } else {
    res.status(404).json({ error: "Jugador no encontrado" });
  }
});


// Subir un Jugador
app.post("/api/players", (req: Request, res: Response) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({ error: "Content missing" });
  }

  const newPlayer: IPlayer = {
    Agents_len: body.Agents_len,
    id: body.id,
    tournament: body.tournament,
    stages: body.stages,
    match_type: body.match_type,
    name: body.name,
    team: body.team,
    agents: body.agents,
    rounds_played: body.rounds_played,
    rating: body.rating,
    acs: body.acs,
    kd: body.kd,
    kast: body.kast,
    adr: body.adr,
    kpr: body.kpr,
    apr: body.apr,
    fkpr: body.fkpr,
    fdpr: body.fdpr,
    hs: body.hs,
    clutch_success: body.clutch_success,
    clutches: body.clutches,
    max_kills: body.max_kills,
    kills: body.kills,
    deaths: body.deaths,
    assists: body.assists,
    fk: body.fk,
    fd: body.fd,
    photo: body.photo,
  };

  players.push(newPlayer); // añadir al array
  res.status(201).json(newPlayer);
});


// Buscar todos los torneos
app.get("/api/tournaments", (req: Request, res: Response) => {
  res.json(tournaments);
});

// Subir un Torneo
app.post("/api/tournaments", (req: Request, res: Response) => {
  try {
    const newTorneo = Tournament.create(req.body);
    res.status(201).json(newTorneo);
  } catch (error) {
    console.error("Error al crear Torneo:", error);
    res.status(400).json({ message: "Error al crear torneo", error });
  }
});

// Buscar torneos por id
app.get("/api/tournaments/:id", (request, response, next) => {
    const torneoID = Number(request.params.id);
    Tournament.findOne({ "Tournament ID": torneoID })
    .then((torneo) => {
      if (torneo) {
        response.json(torneo);
      } else {
        response.status(404).end();
      }
    }).catch((error) => {
      next(error);
    });
});

// Buscar torneos por años
app.get("/api/tournaments/year/:anno", (req: Request, response: Response, next) => {
    const anno = Number(req.params.anno);
    Tournament.findOne({ Year: anno })
    .then((torneo) => {
      if (torneo) {
        response.json(torneo);
      } else {
        response.status(404).end();
      }
    }).catch((error) => {
      next(error);
    });
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


/**
app.delete("/api/players/:id", (request, response, next) => {
  const id = request.params.id;
  players.findByIdAndDelete(id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});
*/
const errorHandler = (
  error: { name: string; message: string },
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.error(error.message);

  console.error(error.name);
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const unknownEndpoint = (request: Request, response: Response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "localhost";

app.listen(Number(PORT), HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

