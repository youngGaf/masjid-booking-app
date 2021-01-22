const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const database = require('./model/database-connection')
const logger = require('morgan');
dotenv.config();

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoutes = require('./routes/index');



const PORT = process.env.PORT ||  8080;



app.listen(PORT, async () => {
   await database.connect(); 
   console.log(`Server running on port ${PORT}....`)
});

app.use('/api/v1', indexRoutes);