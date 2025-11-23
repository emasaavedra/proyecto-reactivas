import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: {
    type: String,
    required: true
  },
  email: { 
    type: String, 
    required: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  cards: { 
    type: Number, 
    default: 0 
  },
  favoriteTeam: { 
    type: String, 
    default: "" 
  },
  points: { 
    type: Number, 
    default: 0 
  },
  myPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", UserSchema);

export default User;