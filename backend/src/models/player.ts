import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer extends Document {
  Agents_len: number;
  id: string;
  tournament: string;
  stages: string;
  match_type: string;
  name: string;
  team?: string;
  agents: string[];
  rounds_played?: number;
  rating?: number;
  acs?: number;
  kd?: number;
  kast?: number;
  adr?: number;
  kpr?: number;
  apr?: number;
  fkpr?: number;
  fdpr?: number;
  hs?: number;
  clutch_success?: number;
  clutches?: string;
  max_kills?: number;
  kills?: number;
  deaths?: number;
  assists?: number;
  fk?: number;
  fd?: number;
  photo?: string;
}

const playerSchema = new Schema({
  id: String,
  Agents_len: Number,
  tournament: String,
  stages: String,
  match_type: String,
  name: { type: String, required: true },
  team: String,
  agents: { type: [String], default: [] },
  rounds_played: Number,
  rating: Number,
  acs: Number,
  kd: Number,
  kast: Number,
  adr: Number,
  kpr: Number,
  apr: Number,
  fkpr: Number,
  fdpr: Number,
  hs: Number,
  clutch_success: Number,
  clutches: String,
  max_kills: Number,
  kills: Number,
  deaths: Number,
  assists: Number,
  fk: Number,
  fd: Number,
  photo: String
}, { timestamps: true });

playerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Player = mongoose.model<IPlayer>("Player", playerSchema);
export default Player;
