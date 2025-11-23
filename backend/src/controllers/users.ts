import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";

const router = express.Router();

router.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

router.get("/", async (req, res) => {
    const users = await User.find({});
    res.json(users);
})

export default router;