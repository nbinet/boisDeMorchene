import express from 'express';

const dogsController = express();

dogsController.get("/all", async (req, res) => {
    res.send({ dogs: [] });
});

export default dogsController;