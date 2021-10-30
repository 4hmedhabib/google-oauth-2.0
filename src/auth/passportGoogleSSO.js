const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const callBackUrl = 'localhost:5000/api/v1/auth/google/callback';
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: callBackUrl,
			passReqToCallback: true
		},
		async (req, accessToken, refreshToken, profile, cb) => {
			const defaultUser = {
				fullName: `${user.name.givenname} ${user.name.familyName}`,
				picture: profile.photos[0].value,
				googleId: profile.id
			};

			const user = await User.findOrCreate({
				where: { googleId: profile.id },
				defaults: defaultUser
			}).catch((err) => {
				cosnole.log('Error signin up ================', err);
				cb(err, null);
			});

			if (user && user[0]) return cb(null, user && user[0]);
		}
	)
);

passport.serializeUser((user, cb) => {
	console.log('Serializing user ========================: ', user);
	cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
	const user = await User.findOne({ where: { id } }).catch((err) => {
		console.log('Error deserializing ===============', err);
		cb(err, null);
	});

	console.log('Deserialized user ========================: ', user);

	if (user) cb(null, user);
});
