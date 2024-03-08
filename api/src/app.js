import express, { json } from 'express';
import contactController from './controllers/contact.js';
import contactControllerAdmin from './controllers/admin/contact.js';
import cors from 'cors';

const app = express();

app.use(cors())
app.use(json());
app.use('/contact', contactController);
app.use('/admin/contact', contactControllerAdmin);

app.listen(8000);