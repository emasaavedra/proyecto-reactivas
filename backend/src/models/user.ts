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
  }
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id?.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash; // No exponer el hash
  },
});

const User = mongoose.model("User", UserSchema);

export default User;