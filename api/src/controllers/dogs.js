import express from 'express';
import { findDetailsById, findDogsByRaceId } from '../services/dogs.js';

const dogController = express();

dogController.get("/:id", async (req, res) => {
    const { id } = req.params;
    const dog = await findDetailsById.execute({ id });
    res.send({ dog });
});

dogController.get("/race/:raceId", async (req, res) => {
    const { raceId } = req.params;
    const dogs = await findDogsByRaceId.execute({ raceId });
    res.send({ dogs });
});

export default dogController;
