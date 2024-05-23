import express from 'express';
import { findDetailsBySlug } from '../services/races.js';

const raceController = express();

raceController.get("/:slug", async (req, res) => {
    const { slug } = req.params;
    const race = await findDetailsBySlug.execute({ slug });
    res.send({ race });
});

export default raceController;