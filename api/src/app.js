import express, { json } from 'express';
import contactController from './controllers/contact.js';
import contactControllerAdmin from './controllers/admin/contact.js';
import cors from 'cors';
import raceController from './controllers/admin/races.js';
<<<<<<< HEAD
import dogsController from './controllers/admin/dogs.js';
=======
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
>>>>>>> 3b684517f499bb55708ab2d0d27e8433baf86b18

const app = express();

app.use(cors())
app.use(json());
app.use('/public', express.static('public'));
app.use('/contact', contactController);
app.use('/admin/contact', contactControllerAdmin);
app.use('/admin/races', raceController);
app.use('/admin/dogs', dogsController);

app.listen(8000);