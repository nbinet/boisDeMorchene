import express from 'express';

const contactController = express();

contactController.get("/", (req, res) => {
    res.send({});
});

export default contactController;