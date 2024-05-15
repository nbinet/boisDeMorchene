import express from 'express';
import { deleteRace, findAllRaces, findRaceById, findRaceBySlug, setRace } from '../../services/races.js';
import { slugify } from '../../utils/text.js';
import multer from 'multer';
import path from 'path';
import { unlink } from 'fs';
import { verifyJwt } from '../../utils/jwt.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/races/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage });

const raceController = express();

raceController.get("/", verifyJwt(), async (req, res) => {
    const races = await findAllRaces.execute();
    res.send({ races });
});

raceController.post("/", verifyJwt(), upload.single('image'), async (req, res) => {
    const { id = undefined, label, description, image } = req.body;
    const slug = slugify(label);
    const existing = await findRaceBySlug.execute({ slug });

    if (!id && existing?.length) {
        if (req.file?.path)
            unlink(req.file.path);
        res.send({ error: "Ce nom est déjà utilisé" });
        return;
    }

    if (existing?.image && (req.file?.path || !image))
        unlink(existing.image);

    const imagePath = req.file?.path ?? undefined;

    if (!label) {
        res.send({ error: true });
        return;
    }

    await setRace.execute({ label, slug, description, imagePath });

    res.send({ updated: true });
});

raceController.delete("/:id", verifyJwt(), async (req, res) => {
    const { id } = req.params;
    const race = await findRaceById.execute({ id }) ?? null;

    if (!race) {
        res.send({ error: "Cette race est introuvable" });
        return;
    }

    if (race.image)
        unlink(race.image);

    await deleteRace.execute({ id });

    res.send({ deleted: true });
});

export default raceController;