import express, { json } from 'express';
import contactController from './controllers/contact.js';

const app = express();

app.use(json());
app.use('/contact', contactController);

app.get("/", (req, res) => {
    res.send("hello");
});

app.listen(80);