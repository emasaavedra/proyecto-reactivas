import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser"; // ← NUEVO
import config from "./config/config"; // ← NUEVO
import playersRouter from "./routes/players";
import loginRouter from "./routes/login"; // ← NUEVO

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

// CORS con credenciales
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser()); // ← NUEVO - Debe ir ANTES de express.json()
app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Connected to MongoDB");

    app.use("/api", playersRouter);
    app.use("/api", loginRouter); // ← NUEVO
    
    app.get("/", (req: Request, res: Response) => {
      res.send("<h1>Servidor funcionando correctamente :D</h1>");
    });

    app.use(errorHandler); // ← Mover al final

    app.listen(config.PORT, () => {
      console.log(`Server running on http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}

startServer();