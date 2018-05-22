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
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				console.log('User already exist');
				return done(null, existingUser);
			}
			// if the user doesn't exist, add the user to db
			const user = await new User({
				googleId: profile.id,
			}).save();
			done(null, user);
		}
	)
);
