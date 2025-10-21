import mongoose, {Schema} from "mongoose";
import ITournament from "./ITournament";

const tournamentSchema: Schema = new Schema(
  {
    TournamentID: { type: Number },
    Year: { type: Number },
    tournament: { type: String, required: true },
    players: { type: [Number], default: [] }
  },
  { timestamps: true }
);

const Tournament = mongoose.model<ITournament>("Tournament", tournamentSchema);

export default Tournament;