import express from 'express';
import { findAllDogs, setDog } from '../../services/dogs.js';
import { findRaceByLabel } from '../../services/races.js';

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
        race
    } = req.body;

    const existingRace = await findRaceByLabel.execute({ label:race });

    console.log(existingRace);
    console.log(existingRace.id);

    if (existingRace.length === 0 || !existingRace[0].id) {
        res.send({ error: "Aucune race avec ce nom"});
        return;
    }

    await setDog.execute({ name, age, raceId: existingRace[0].id });
    res.send({ updated: true });
    
});


export default dogsController;