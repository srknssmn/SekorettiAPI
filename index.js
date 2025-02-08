import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));

app.get("/", (req, res) => {
    res.send("Sekoretti Server...")
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})