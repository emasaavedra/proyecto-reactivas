import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user";
import config from "../config/config";
import { withUser } from "../utils/middleware";

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password required" });
    }

    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Crear token con CSRF incluido
    const userForToken = {
      username: user.username,
      csrf: crypto.randomUUID(),
      id: user._id.toString(),
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET, {
      expiresIn: 60 * 60, // 1 hora
    });

    // Enviar CSRF token en header
    res.setHeader("X-CSRF-Token", userForToken.csrf);
    
    // Enviar JWT en cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hora
    });

    res.status(200).json({ 
      username: user.username, 
      name: user.name,
      id: user._id 
    });
  } catch (error) {
    next(error);
  }
};

// Register
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !password || !email || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash de la contraseña
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      name,
      email,
      passwordHash,
      cards: 0,
      favoriteTeam: "",
      points: 0,
    });

    const savedUser = await newUser.save();

    // Auto-login después del registro
    const userForToken = {
      username: savedUser.username,
      csrf: crypto.randomUUID(),
      id: savedUser._id.toString(),
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET, {
      expiresIn: 60 * 60,
    });

    res.setHeader("X-CSRF-Token", userForToken.csrf);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      username: savedUser.username,
      name: savedUser.name,
      id: savedUser._id,
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};