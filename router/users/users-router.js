const router = require('express').Router();

const Users = require('./users-model.js');
const Graphs = require('../graphs/graphs-model.js')
const restricted = require('../../api/middleware/restricted-middleware.js');

router.get('/:userid', restricted, async (req, res) => {
	try {
		const request = await Graphs.graphs(req.params.userid);
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
})

router.delete('/:id', async (req, res) => {
	try {
		const removed = await Users.remove(req.params.id);
		if (removed) {
			res.status(204).end()
		} else {
			res.status(404).end()
		}
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
})

module.exports = router