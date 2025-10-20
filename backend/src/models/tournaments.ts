import mongoose, {Schema} from "mongoose";
import ITournament from "./ITournament";

const TournamentSchema: Schema<ITournament> = new Schema({
    "Tournament ID": {type: Number, required: true},
    Year: {type: Number, required: true},
    tournament: {type: String, required: true},
    players: {type: [Number], required: true},
});

const Tournament = mongoose.model("Tournament", TournamentSchema);

TournamentSchema.set("toJSON", {
  transform: (
    document,
    returnedObject: { "Tournament ID"?: number; _id?: mongoose.Types.ObjectId; __v?: number }
  ) => {
    returnedObject["Tournament ID"] = Number(returnedObject._id);
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default Tournament;