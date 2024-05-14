import express from 'express';
import { getConfigurationValues } from '../services/configuration.js';
import { findAllSocialNetworks } from '../services/socialNetwork.js';

const contactController = express();

contactController.get("/infos", async (req, res) => {
    const configurations = await getConfigurationValues.execute({ category: "CONTACT_", categoryLike: 'CONTACT_%' });
    res.send({
        infos: configurations.reduce((accu, configuration) => { accu[configuration.key] = configuration.value; return accu }, {})
    });
});

contactController.get("/reseaux-sociaux", async (req, res) => {
    const socialNetworks = await findAllSocialNetworks.execute();
    res.send({
        socialNetworks
    });
});

export default contactController;