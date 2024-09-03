const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const corsOptions = require('./config/corsOptions');
const cors = require("cors");
const credentials = require('./middleware/credentials');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const authRoute = require('./route/authRoute');
const connectDB = require('./config/dbConn');
const actorRoute = require('./route/actorRoute');
const refresh = require('./route/refresh');
const path = require("node:path");

connectDB();
const app = express();

app.use(credentials);

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(bodyParser.json());

app.use('/', authRoute)
app.use('/refresh', refresh)
app.use('/actor', actorRoute)

// app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;