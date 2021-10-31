const express = require('express');
const router = express.Router();

const { isUserAuthenticated } = require('../middlewares/auth');

router.get('/auth/user', isUserAuthenticated, (req, res) => {
	res.json(req.user);
});

module.exports = router;
