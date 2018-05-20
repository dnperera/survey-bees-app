const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const { mongoURI, cookieKey } = require('./config/keys');
require('./models/User');
require('./services/passport');

//const authRoutes = require('./routes/authRoutes');
//
mongoose.connect(mongoURI, error => {
	console.log('connection error -->' + error);
});

const app = express();

//setting cookie session in express and passport
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [cookieKey],
	})
);

//tell passport to make use of sessions
app.use(passport.initialize());
app.use(passport.session());

//authRoutes(app);
require('./routes/authRoutes')(app);

//let passport knows , we goingto use google strategy as auth method
const PORT = process.env.PORT || 5000;

app.listen(PORT);
