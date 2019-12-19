const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../../api/secrets.js');

const Users = require('../users/users-model.js');

const generateToken = user => {
	const payload = {
		subject: user.id,
		username: user.username,
	};
	const options = {
		expiresIn: '1hr',
	};

	return jwt.sign(payload, secrets.jwtSecret, options)
}

// Endpoints
router.post('/register', async (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 14);
	user.password = hash;

	try {
		const registered = await Users.add(user);
		registered ? res.status(201).json(registered) : res.status(404)
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
});

router.post('/login', async (req, res) => {
	let { username, password } = req.body;
	try {
		const login = await Users.findBy({ username }).first();
		if (login && bcrypt.compareSync(password, login.password)) {
			const token = generateToken(login);
			res.status(200).json(token)
		} else {
			res.status(401)
		}
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
})

module.exports = router