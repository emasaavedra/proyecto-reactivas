import mongoose, { Schema, Document } from "mongoose";
import IPlayer from "./IPlayer";

const PlayerSchema: Schema<IPlayer> = new Schema({
  Agents_len: { type: Number, required: true },
  id: { type: Number, required: true, unique: true },
  tournament: { type: String, required: true },
  stages: { type: String, required: true },
  match_type: { type: String, required: true },
  name: { type: String, required: true },
  team: { type: String, required: true },
  agents: { type: [String], required: true },
  rounds_played: { type: Number, required: true },
  rating: { type: Number, required: true },
  acs: { type: Number, required: true },
  kd: { type: Number, required: true },
  kast: { type: Number, required: true },
  adr: { type: Number, required: true },
  kpr: { type: Number, required: true },
  apr: { type: Number, required: true },
  fkpr: { type: Number, required: true },
  fdpr: { type: Number, required: true },
  hs: { type: Number, required: true },
  clutch_success: { type: Number, required: true },
  clutches: { type: String, required: true },
  max_kills: { type: Number, required: true },
  kills: { type: Number, required: true },
  deaths: { type: Number, required: true },
  assists: { type: Number, required: true },
  fk: { type: Number, required: true },
  fd: { type: Number, required: true },
  photo: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        // Solo permite URLs relativas, no comienza con http:// o https://
        return !/^https?:\/\//.test(v);
      },
      message: (props: any) => `${props.value} no es una URL relativa válida`,
    },
  },
});
const Player = mongoose.model<IPlayer>("Player", PlayerSchema);

PlayerSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: number; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = Number(returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

export default Player;
