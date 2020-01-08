const router = require('express').Router();

const Graphs = require('./graphs-model.js');

router.get('/', async (req, res) => {
	try {
		const request = await Graphs.graphs();
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
})
router.get('/:id', async (req, res) => {
	try {
		const request = await Graphs.graphById(req.params.id);
		res.status(200).json(request)
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
})

module.exports = router

/*
This is what I need to build to house everything. All of the find by id's
router.get('/:id', async (req, res) => {
    try {
        const item = await Projects.findById(req.params.id);
        const resources = await Resources.findResourcesById(req.params.id)
        const tasks = await Tasks.findTasksById(req.params.id)
        item.resources = resources;
        item.tasks = tasks
        if(item){
            res.status(200).json({ item });
        } else {
            res.status(404).json({ message: "User does not exist"});
        }
    } catch (e) {
        res.status(500).json({ message: "This is awkward...", error: e.message });
    }
});
*/