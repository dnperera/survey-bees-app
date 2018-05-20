const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');
require('./models/User');
require('./services/passport');

//const authRoutes = require('./routes/authRoutes');
//
mongoose.connect(mongoURI, error => {
	console.log('connection error -->' + error);
});

const app = express();
//authRoutes(app);
require('./routes/authRoutes')(app);

//let passport knows , we goingto use google strategy as auth method
const PORT = process.env.PORT || 5000;

app.listen(PORT);
