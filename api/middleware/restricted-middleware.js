const jwt = require('jsonwebtoken');
const secrets = require('../secrets.js');

const restricted = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
			if (err) {
				res.status(401).end()
			} else {
				req.decodeJwt = decodedToken;
				next();
			}
		})
	} else {
		res.status(403).end()
	}
}

module.exports = restricted