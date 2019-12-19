const db = require('../../database/db-config.js');

const find = () => {
	return db('users');
}

const findBy = (filter) => {
	return db('users').where(filter);
}

const findById = (id) => {
	return db('users').where({ id }).first()
}

const add = async (user) => {
	const [id] = await db('users').insert(user);
	return findById(id);
}

const remove = (id) => {
	return db('users').where({ id }).del();
}

module.exports = {
	find, findBy, findById, add, remove
}