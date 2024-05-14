import express from 'express';
import { findAllDogs } from '../../services/dogs.js';

const dogsController = express();

dogsController.get("/all", async (req, res) => {
    res.send({ dogs: findAllDogs.id });
});

export default dogsController;