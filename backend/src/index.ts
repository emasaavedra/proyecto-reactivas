import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./config/config"; // ← NUEVO
import playersRouter from "./routes/players";
import loginRouter from "./routes/login"; // ← NUEVO
import usersRouter from "./routes/users";
import cookieParser from "cookie-parser";
import tournamentRouter from "./routes/tournaments";
import path from 'path';

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

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [`https://fullstack.dcc.uchile.cl:${config.PORT}`]
  : ["http://localhost:5173"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('dist')); // Servir archivos estáticos del frontend

async function startServer() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to MongoDB");

    app.use("/api", playersRouter);
    app.use("/api", loginRouter);
    app.use("/api/", tournamentRouter);
    app.use("/api/users", usersRouter);
    
    app.get("/", (req: Request, res: Response) => {
      res.send("<h1>Servidor funcionando correctamente :D</h1>");
    });

    app.use(errorHandler);

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
    });

    app.listen(config.PORT, () => {
      console.log(`Server running on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}

startServer();