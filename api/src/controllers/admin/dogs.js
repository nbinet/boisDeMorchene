import express from 'express';
import { findAllDogs, setDog, findDogById, deleteDog, updateDog } from '../../services/dogs.js';
import { findRaceById, findRaceBySlug } from '../../services/races.js';
import { race } from '../../db/schema.js';
import { verifyJwt } from '../../utils/jwt.js';

const dogsController = express();

dogsController.get("/", verifyJwt(), async (req, res) => {
    const dogs = await findAllDogs.execute();
    res.send({ dogs });
});

dogsController.post("/", verifyJwt(), async (req, res) => {

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

dogsController.patch("/:id", verifyJwt(), async (req, res) => {
    const { id } = req.params;
    const { name, age, raceId } = req.body;

    const dog = await findDogById.execute({ id }) ?? null;

    if (dog.length === 0 || !dog[0].id) {
        res.send({ error: "Ce chien est introuvable" });
        return;
    }

    const existingRace = await findRaceById.execute({ id: raceId });

    if (existingRace.length === 0 || !existingRace[0].id) {
        res.send({ error: "Aucune race trouvé avec cet id"});
        return;
    }

    await updateDog.execute({ id, name, age, raceId });

    res.send({ updated: true });
});

dogsController.delete("/:id", verifyJwt(), async (req, res) => {
    const { id } = req.params;
    const dog = await findDogById.execute({ id }) ?? null;
    
    if (dog.length === 0 || !dog[0].id) {
        res.send({ error: "Ce chien est introuvable" });
        return;
    }

    await deleteDog.execute({ id });

    res.send({ deleted: true });
});


export default dogsController;