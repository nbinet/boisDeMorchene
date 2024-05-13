import express from 'express';
import { deleteRace, findAllRaces, setRace } from '../../services/races.js';
import { slugify } from '../../utils/text.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/races/' });

const raceController = express();

raceController.get("/", async (req, res) => {
    const races = await findAllRaces.execute();
    res.send({ races });
});

raceController.post("/", upload.single('image'), async (req, res) => {
    const { label, description } = req.body;
    console.log(req.file);
    res.send({ error: true });
    return;
    const slug = slugify(label);

    if (!label || !description) {
        res.send({ error: true });
        return;
    }

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