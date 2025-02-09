import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser';
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());


app.listen(port,()=>{
    console.log("backend working");
})
