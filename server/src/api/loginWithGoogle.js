const express = require('express');
const passport = require('passport');
const { isUserAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.get('/login/google', passport.authenticate('google', { scope: [ 'profile', 'email' ] }));

const successLoginUrl = 'http://localhost:3000/login/success';
const errorLoginUrl = 'http://localhost:3000/login/error';

router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureMessage: 'Cannot login to Google, please try again later!',
		failureRedirect: errorLoginUrl,
		successRedirect: successLoginUrl
	}),
	(req, res) => {
		console.log('User =========', req.user);
		res.send('Thank you for siging in!');
	}
);

router.get('/test', isUserAuthenticated, (req, res) => {
	res.send('Success');
});

module.exports = router;
