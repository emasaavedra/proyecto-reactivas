import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const url = process.env.MONGODB_URI || "127.0.0.1";
const dbName = process.env.MONGODB_DBNAME;

mongoose.set("strictQuery", false);
if (url) {
  mongoose.connect(url, { dbName });
  console.log("Connected to MongoDB");
}

const PlayerSchema = new mongoose.Schema({
  Agents_len: Number,
  tournament:String,
  stages:String,
  match_type:String,
  name:String,
  team:String,
  agents:[String],
  rounds_played:Number  ,
  rating:Number  ,
  acs:Number  ,
  kd:Number  ,
  kast:Number  ,
  adr:Number  ,
  kpr:Number  ,
  apr:Number  ,
  fkpr:Number  ,
  fdpr:Number  ,
  hs:Number  ,
  clutch_success:Number  ,
  clutches:String  ,
  max_kills:Number  ,
  kills:Number  ,
  deaths:Number  ,
  assists:Number  ,
  fk:Number  ,
  fd:Number,
  photo: {
    type: String,
    validate: {
      validator: function (v: string) {
        // Solo permite URLs relativas, no comienza con http:// o https://
        return !/^https?:\/\//.test(v);
      },
      message: (props: any) => `${props.value} no es una URL relativa válida`,
    },
  },
});

const Player = mongoose.model("Player", PlayerSchema);

PlayerSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { id?: string; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default Player;
