import express from 'express';
import { setConfigurationValue } from '../../services/configuration.js';
import { socialNetworksAvailable } from '../../consts/socialNetworks.js';
import { deleteSocialNetwork, findAllSocialNetworks, setSocialNetwork } from '../../services/socialNetwork.js';

const contactController = express();

contactController.post("/infos", async (req, res) => {
    for (const [k, value] of Object.entries(req.body)) {
        const key = `CONTACT_${k.toUpperCase()}`;
        await setConfigurationValue.execute({ key, value });
    }

    res.send({ updated: true });
});

contactController.get("/reseaux-sociaux/tout", async (req, res) => {
    res.send({ socialNetworks: socialNetworksAvailable });
});

contactController.get("/reseaux-sociaux", async (req, res) => {
    const socialNetworks = await findAllSocialNetworks.execute();
    res.send({ socialNetworks });
});

contactController.post("/reseaux-sociaux", async (req, res) => {
    const { label, url } = req.body;
    if (!label || !url) {
        res.send({ error: "Le réseau social et son URL sont requis" });
        return;
    }

    await setSocialNetwork.execute({ label, url });

    res.send({ updated: true });
});

contactController.delete("/reseaux-sociaux/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.send({ error: "Ce réseau social est introuvable" });
        return;
    }

    await deleteSocialNetwork.execute({ id });

    res.send({ deleted: true });
});

export default contactController;