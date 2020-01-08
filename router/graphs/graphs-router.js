const router = require('express').Router();

const Graphs = require('./graphs-model.js');

router.get('/:id', async (req, res) => {
	try {
		const graphs = await Graphs.graphById(req.params.id);
		for (let graph of graphs) {
			graph.labels = await Graphs.graphLabels(graph.id);
			graph.datasets = await Graphs.graphDatasets(graph.id);
			for (let dataset of graph.datasets) {
				// console.log(dataset.data = "Dummy Data")
				dataset.data = await Graphs.graphData(dataset.id)
			}
		}
		res.status(200).json({ message: "Get all graphs by user", graphs })
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