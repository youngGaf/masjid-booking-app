const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./model/database-connection')

dotenv.config();


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

const PORT = process.env.PORT ||  8080;



app.listen(PORT, async () => {
   await database.connect(); 
   console.log(`Server running on port ${PORT}....`)
});