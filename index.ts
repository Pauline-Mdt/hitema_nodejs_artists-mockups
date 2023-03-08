import mongoose from 'mongoose';
import express from 'express';
import routes from './src/routes';
import {tokenDefined} from './src/middewares/authMiddleware';
import {handleErrors} from './src/middewares/errorMiddleware';
import UserController from './src/controllers/UserController';
import {APP_PORT} from './src/config';

mongoose.connect('mongodb://127.0.0.1:27017/my_db')
    .then(async () => {
        console.log('Connected to MongoDB');
        await UserController.createAdmin();
    })
    .catch(err => console.error('Could not connect to MongoDB... Error: ', err));

const app = express();

app.use(express.json());
app.use(tokenDefined());
app.use(handleErrors);

app.use(routes);

app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`)
});