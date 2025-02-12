import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
import 'dotenv/config'
import { ConnectDb } from './config/db.js';
import userRouter from './routes/userRouter.js';

const app = express();
const port = process.env.PORT || 4000;


app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

ConnectDb();

//api endpoints
app.use('/api/users',userRouter)


app.listen(port,()=>{
    console.log("backend working");
})
