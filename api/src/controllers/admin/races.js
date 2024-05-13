import express from 'express';
import { deleteRace, findAllRaces, setRace } from '../../services/races.js';

const raceController = express();

raceController.get("/", async (req, res) => {
    res.send({ races: findAllRaces });
});

raceController.post("/", async (req, res) => {
    const { label, description } = req.body;
    const slug = label.toLowerCase().replace(/\d/, '-');

    if (!label || !description)
        return { error: true };

    await setRace.execute({ label, slug, description });

    res.send({ updated: true });
});

raceController.delete("/", async (req, res) => {
    const { id } = req.body;
    if (!id)
        return { error: true };

    await deleteRace.execute({ id });

    res.send({ deleted: true });
});

export default raceController;