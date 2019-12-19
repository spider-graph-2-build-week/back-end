require('dotenv').config();

module.exports = {
	jwtSecret: process.env.JWT_SECRET || "Chuck Norris can check out books from the Library of Congress"
}