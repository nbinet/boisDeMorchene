import express from 'express';
import { deletePasswordRequest, deletePasswordRequests, findPasswordRequest, findUserByEmail, findUserById, newPasswordRequest, setUser } from '../services/auth.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { hash, uuidv4 } from '../utils/crypto.js';
import { sendMail } from '../utils/mailer.js';

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


authController.post("/mot-de-passe-oublie", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        res.send({ error: "Le mail est requis" });
        return;
    }

    const user = await findUserByEmail.execute({ email });

    if (!user) {
        res.send({ ok: true });
        return;
    }

    const token = uuidv4();
    const hashedToken = await hash(token);

    await newPasswordRequest.execute({
        token: hashedToken,
        userId: user.id 
    });

    const path = `${process.env.FRONT_URL}/reinitialiser-mot-de-passe?token=${token}`;

    sendMail(user.email, "Réinitialisation de votre mot de passe", `
        <h1>Une demande de réinitialisation de mot de passe a été effectuée</h1><br />
        <span>Pour réinitialiser votre mot de passe, cliquez sur ce lien :</span><br />
        <a href="${path}">${path}</a>
    `);

    res.send({ ok: true });
});

authController.post("/mot-de-passe-oublie/verification", async (req, res) => {
    const { token } = req.body;

    if (!token) {
        res.send({ verified: false });
        return;
    }

    const hashedToken = await hash(token);
    const passwordRequest = await findPasswordRequest.execute({ token: hashedToken });

    let diffTime = passwordRequest?.time ? Math.abs((new Date) - passwordRequest.time) : undefined;
    diffTime = diffTime ? Math.floor(diffTime / (1000 * 60)) : undefined;

    res.send({ verified: diffTime && diffTime < 60 });
});

authController.post("/mot-de-passe-oublie/reinitialisation", async (req, res) => {
    const { token, password } = req.body;

    if (!password) {
        res.send({ error: "Le mot de passe est requis" });
        return;
    }

    if (password.length < 8) {
        res.send({ error: "Le mot de passe doit faire au moins 8 caractères" });
        return;
    }

    const hashedToken = await hash(token);
    const passwordRequest = await findPasswordRequest.execute({ token: hashedToken });

    let diffTime = passwordRequest?.time ? Math.abs((new Date) - passwordRequest.time) : undefined;
    diffTime = diffTime ? Math.floor(diffTime / (1000 * 60)) : undefined;

    console.log(diffTime, passwordRequest, hashedToken);
    
    if (!diffTime || diffTime > 60) {
        if (passwordRequest)
            await deletePasswordRequest.execute({ token: passwordRequest.token });
        res.send({ expired: true });
        return;
    }

    const user = await findUserById.execute({ id: passwordRequest.user });

    if (!user) {
        await deletePasswordRequest.execute({ token: passwordRequest.token });
        res.send({ expired: true });
        return;
    }

    const newPassword = await bcrypt.hash(password, 10);

    await setUser.execute({
        email: user.email,
        password: newPassword
    });

    await deletePasswordRequests.execute({ userId: user.id });

    res.send({ done: true });
});

export default authController;