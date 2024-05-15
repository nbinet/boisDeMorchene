import express from 'express';
import { findUserByEmail, setUser } from '../services/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

const authController = express();

authController.get("/create-admin", async (req, res) => {
    const password = await bcrypt.hash("admin", 10);

    await setUser.execute({
        email: "admin@admin.fr",
        password: password
    });

    res.send({ created: true });
})

authController.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.send({ error: "Les identifiants sont requis" });
        return;
    }

    const user = await findUserByEmail.execute({ email });

    const valid = await bcrypt.compare(password, user?.password);

    if (!valid) {
        res.send({ error: "Identifiants invalides"});
        return;
    }

    const token = jwt.sign({ id: String(user.id) }, process.env.JWT_SECRET, { expiresIn: '7d'});

    res.send({ token });
});

export default authController;