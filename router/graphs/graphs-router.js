const router = require('express').Router();

const Graphs = require('./graphs-model.js');

router.get('/:id', async (req, res) => {
	try {
		const item = await Graphs.graphs(req.params.id)
		res.status(200).json(item)
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
})

router.post('/:userid', async (req, res) => {
	const { userid } = req.params
	const graph = {
		title: req.body.title,
		description: req.body.description
	}
	try {
		req.body.labels.map(async label => {
			console.log(label)
			await Graphs.addToLabels(label)
		})
		req.body.datasets.map(async datasetObj => {
			console.log(datasetObj)
			const label = {
				dataset_label: datasetObj.dataset_label
			}
			await Graphs.addLabelToDataset(label)
			if (datasetObj.data.length > 0) {
				datasetObj.data.map(async dataItem => {
					console.log(dataItem)
					await Graphs.addDataToDataset(dataItem)
				})
			}

		})
		const item = await Graphs.add(userid, req.body)
		res.status(200).json(item)
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
})
router.put('/:userid/:graphid', async (req, res) => {
	const { userid, graphid } = req.params
	const { changes } = req.body
	try {
		const item = await Graphs.update(userid, graphid, changes)
		res.status(200).json(item)
	} catch (e) {
		res.status(500).json({ error: e.message })

	}
})
router.delete('/:userid/:graphid', async (req, res) => {
	const { userid, graphid } = req.params
	try {
		const item = await Graphs.remove(userid, graphid)
		res.status(200).json(item)
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