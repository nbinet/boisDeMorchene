import express from 'express';
import { setConfigurationValue } from '../../services/configuration.js';

const contactController = express();

contactController.post("/infos", async (req, res) => {
    console.log(req.body);

    for (const [k, value] of Object.entries(req.body)) {
        const key = `CONTACT_${k.toUpperCase()}`;
        await setConfigurationValue.execute({ key, value });
    }

    res.send({
        updated: true
    });
});

export default contactController;