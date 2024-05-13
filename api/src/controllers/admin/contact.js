import express from 'express';
import { setConfigurationValue } from '../../services/configuration.js';
import { socialNetworksAvailable } from '../../consts/socialNetworks.js';
import { deleteSocialNetwork, setSocialNetwork } from '../../services/socialNetwork.js';

const contactController = express();

contactController.post("/infos", async (req, res) => {
    for (const [k, value] of Object.entries(req.body)) {
        const key = `CONTACT_${k.toUpperCase()}`;
        await setConfigurationValue.execute({ key, value });
    }

    res.send({
        updated: true
    });
});

contactController.get("/reseaux-sociaux/tout", async (req, res) => {
    res.send({ socialNetworks: socialNetworksAvailable });
});

contactController.post("/reseaux-sociaux", async (req, res) => {
    const { label, url } = req.body;
    if (!label || !url)
        return { error: true };

    await setSocialNetwork.execute({ label, url });
    
    res.send({ updated: true });
});

contactController.delete("/reseaux-sociaux", async (req, res) => {
    const { label } = req.body;
    if (!label)
        return { error: true };

    await deleteSocialNetwork.execute({ label });

    res.send({ deleted: true });
});

export default contactController;