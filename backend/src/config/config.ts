import dotenv from 'dotenv';

dotenv.config();

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/valorantdb";
export const PORT = Number(process.env.PORT) || 3000;
