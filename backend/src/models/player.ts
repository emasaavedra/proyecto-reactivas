import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer extends Document {
  Agents_len: number;
  id: number;
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

const playerSchema: Schema = new Schema(
  {
    Agents_len: { type: Number },
    id: { type: Number, required: true },
    tournament: { type: String },
    stages: { type: String },
    match_type: { type: String },
    name: { type: String, required: true },
    team: { type: String },
    agents: { type: [String], default: [] },
    rounds_played: { type: Number },
    rating: { type: Number },
    acs: { type: Number },
    kd: { type: Number },
    kast: { type: Number },
    adr: { type: Number },
    kpr: { type: Number },
    apr: { type: Number },
    fkpr: { type: Number },
    fdpr: { type: Number },
    hs: { type: Number },
    clutch_success: { type: Number },
    clutches: { type: String },
    max_kills: { type: Number },
    kills: { type: Number },
    deaths: { type: Number },
    assists: { type: Number },
    fk: { type: Number },
    fd: { type: Number },
    photo: { type: String }
  },
  { timestamps: true }
);
const Player = mongoose.model<IPlayer>("Player", playerSchema);
export default Player;
