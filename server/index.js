const express = require('express');
const mongoose = require('mongoose');
require('./services/passport');
const { mongoURI } = require('./config/keys');
//const authRoutes = require('./routes/authRoutes');
//
mongoose.connect(mongoURI);

const app = express();
//authRoutes(app);
require('./routes/authRoutes')(app);

//let passport knows , we goingto use google strategy as auth method
const PORT = process.env.PORT || 5000;

app.listen(PORT);
