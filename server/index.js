import config from 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './sequelize.js';
import * as mapping from './models/mapping.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({origin: 'http://localhost:3000', credentials: true}))
app.use(express.json());
app.use(cookieParser(process.env.SECRET_KEY));
app.use('/api', router);


const start = async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.drop()
        await sequelize.sync({alter: true});
        // await sequelize.sync()
        app.listen(PORT, () => console.log('Сервер запущен на порту', PORT));
    } catch (error) {
        console.log('Error:', error);
    }
}

start();