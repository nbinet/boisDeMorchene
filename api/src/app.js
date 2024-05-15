import express, { json, text, urlencoded } from 'express';
import contactController from './controllers/contact.js';
import contactControllerAdmin from './controllers/admin/contact.js';
import raceController from './controllers/races.js';
import raceControllerAdmin from './controllers/admin/races.js';
import dogsController from './controllers/admin/dogs.js';
import authController from './controllers/auth.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(json());
app.use(text());
app.use(urlencoded({ extended: true, limit: '50mb' }));
app.use('/public', express.static('public'));
app.use('/', authController);
app.use('/contact', contactController);
app.use('/races', raceController);
app.use('/admin/contact', contactControllerAdmin);
app.use('/admin/races', raceControllerAdmin);
app.use('/admin/dogs', dogsController);

app.listen(8000);