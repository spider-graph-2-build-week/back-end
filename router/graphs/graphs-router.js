const router = require('express').Router();

const Graphs = require('./graphs-model.js');

// ! Operational
router.get('/:id', async (req, res) => {
	try {
		const item = await Graphs.graphs(req.params.id)
		res.status(200).json(item)
	} catch (e) {
		res.status(500).json({ error: e.message })
	}
})

// ! Non-operational
router.post('/:userid', async (req, res) => {
	const { userid } = req.params
	const graph = {
		id: Date.now(),
		user_id: userid,
		title: req.body.title,
		description: req.body.description,
	}
	try {
		// console.log("Line 24 Graph", graph)
		await Graphs.addToGraphs(graph)
	} catch (e) {
		res.status(500).json({ line: '27', error: e.message })
	}

	req.body.labels.map(async label => {
		label.graph_labels_id = graph.id
		try {
			await Graphs.addToLabels(label)
			// console.log("Line 32 Label", label)
		} catch (e) {
			res.status(500).json({ line: '33', error: e.message })
		}
	})
	req.body.datasets.map(async (dataset, datasetindex) => {
		const datasetObj = {
			graph_datasets_id: graph.id,
			dataset_label: dataset.dataset_label
		}
		try {
			const id = await Graphs.addToDatasets(datasetObj)
			dataset.data.map(async (dataItem) => {
				// Dataset_id must exist in the database. The numbers in the database are all random and not accessible from here.
				dataItem.dataset_id = id[0].id
				// console.log("dataItem: Fields required id, value, dataset_id ", dataItem)
				try {
					await Graphs.addDataToDataset(dataItem)
				} catch (e) {
					res.status(500).json({ line: '57', error: e.message })
				}
			})
		} catch (e) {
			res.status(500).json({ line: '48', error: e.message })
		}
	})

	try {
		// console.log("This is req.body line 50", req.body)
		const item = await Graphs.graphs(userid)
		res.status(200).json({ message: "Successful", item })
	} catch (e) {
		res.status(500).json({ line: '67', error: e.message })
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
router.delete('/:userid/:id', async (req, res) => {
	const { id, userid } = req.params
	try {
		const item = await Graphs.remove(id, userid)
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

// // ! Graph Table
// {
// 	id
// 	user_id
// 	title
// 	description
// }

// // ! Labels Table
// {
// 	id
// 	graph_labels_id
// 	label
// }
// // ! Datasets Table
// {
// 	id
// 	graph_datasets_id
// }
// // ! Dataset Table
// {
// 	id
// 	datasets_id
// 	dataset_label
// }
// // ! Data
// {
// 	id
// 	dataset_id
// 	value
// }