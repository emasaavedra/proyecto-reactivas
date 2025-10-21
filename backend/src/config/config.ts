import dotenv from 'dotenv';

dotenv.config();

export default {
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/valorantdb",
  PORT: process.env.PORT || 3001
};