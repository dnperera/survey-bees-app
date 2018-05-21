const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const { googleClientID, googleClientSecret } = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	// this is how passport create unique session id (token) for each user
	done(null, user.id); // user.id means mongo id of user's collection
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: googleClientID,
			clientSecret: googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(existingUser => {
				if (existingUser) {
					console.log('User already exist');
					done(null, existingUser);
				} else {
					// if the user doesn't exist, add the user to db
					new User({
						googleId: profile.id,
					})
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);
