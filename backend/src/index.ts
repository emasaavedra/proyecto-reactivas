import express, {Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import playersRouter from "./routes/players";

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
app.use(express.json());
app.use(errorHandler);

const PORT = 3001;
const MONGO_URI = "mongodb://localhost:27017/valorantdb";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.use("/api", playersRouter);
    app.get("/", (req: Request, res: Response) => {
      res.send("<h1>Servidor funcionando correctamente :D</h1>");
    });

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}


startServer();