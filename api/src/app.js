import express, { json } from 'express';
import contactController from './controllers/contact.js';
import contactControllerAdmin from './controllers/admin/contact.js';
import raceController from './controllers/races.js';
import raceControllerAdmin from './controllers/admin/races.js';
import dogsController from './controllers/admin/dogs.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors())
app.use(json());
app.use('/public', express.static('public'));
app.use('/contact', contactController);
app.use('/races', raceController);
app.use('/admin/contact', contactControllerAdmin);
app.use('/admin/races', raceControllerAdmin);
app.use('/admin/dogs', dogsController);

app.listen(8000);