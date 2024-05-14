import express from 'express';
import { findAllDogs, setDog } from '../../services/dogs.js';
import { findRaceById, findRaceByLabel } from '../../services/races.js';
import { race } from '../../db/schema.js';

const dogsController = express();

dogsController.get("/", async (req, res) => {
    const dogs = await findAllDogs.execute();
    res.send({ dogs });
});

dogsController.post("/", async (req, res) => {

    const { 
        id = undefined, 
        name, 
        age, 
        raceId
    } = req.body;

    const existingRace = await findRaceById.execute({ id: raceId });

    console.log(existingRace);

    if (existingRace.length === 0 || !existingRace[0].id) {
        res.send({ error: "Aucune race trouvé avec cet id"});
        return;
    }

    await setDog.execute({ name, age, raceId });
    res.send({ updated: true });
    
});


export default dogsController;