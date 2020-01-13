const db = require('../../database/db-config.js');


// Linking Graphs to Users
/*
select g.id, g.title, g.description from graphs as g
inner join users as u on g.user_id = u.id
and g.user_id = 1
*/

// ? Testing required
const graphById = (id) => {
	return db('graphs as g')
		.select("g.id", "g.title", "g.description")
		.innerJoin('users as u', function () {
			this.on('g.user_id', "=", "u.id").andOn('g.user_id', "=", Number(id))
		})
		.orderBy('g.id')
}
// Linking Labels to Graphs by ID

/*
select L.id, L.label, L.graph_labels_id from labels as L
inner join graphs as G on L.graph_labels_id = G.id
and L.graph_labels_id = 1
*/

// ? Testing required
const graphLabels = (id) => {
	return db('labels as l')
		.select("l.id", "l.label", "l.graph_labels_id")
		.innerJoin('graphs as g', function () {
			this.on('l.graph_labels_id', "=", "g.id").andOn('l.graph_labels_id', '=', Number(id))
		})
}

// Adding Graph Data to Dataset

/* 
select d.id, d.value from data as d
inner join datasets as ds on d.dataset_id = ds.id
and d.dataset_id = 2
*/
// ? Testing required
const datasetData = (datasetid) => {
	return db('data as d')
		.select('d.id', 'd.value', 'd.dataset_id')
		.innerJoin('datasets as ds', function () {
			this.on('d.dataset_id', '=', 'ds.id')
				.andOn('d.dataset_id', '=', Number(datasetid))
		})
}

// Add Dataset Labels per Dataset 
/*
select ds.id, ds.dataset_label from datasets as ds
inner join graphs as g on ds.graph_datasets_id = g.id
and ds.graph_datasets_id = 1
*/

// ? Testing required
const graphDatasets = (id) => {
	return db('datasets as ds')
		.select('ds.id', 'ds.dataset_label')
		.innerJoin('graphs as g', function () {
			this.on('ds.graph_datasets_id', '=', 'g.id')
				.andOn('ds.graph_datasets_id', '=', Number(id))
		})
}

// ? Testing required
const graphs = async (userid) => {
	try {
		const graphs = await graphById(userid);
		for (let graph of graphs) {
			graph.labels = await graphLabels(graph.id)
			graph.datasets = await graphDatasets(graph.id)
			for (let dataset of graph.datasets) {
				dataset.data = await datasetData(dataset.id)
			}
		}

		// for (let graph of graphs) {
		// 	graph.labels = await graphLabels(graph.id);
		// 	graph.datasets = await graphDatasets(graph.id);
		// 	for (let dataset of graph.datasets) {
		// 		dataset.data = await datasetData(dataset.id)
		// 	}
		// 	return graphs
		// }
		return graphs
	} catch (e) {
		console.log(e.message)
	}
}

// ? Testing required
const add = (graph) => {
	console.log("Graphs-model line 90", graph)
	return db('graphs').insert(graph)
}

/*insert into graphs (title, description, user_id) ✅
values ( 'Title of Graph 5', 'This is a description of 5', '2'); */

// ? Testing required
const addToGraphs = (graph) => {
	return db('graphs').insert(graph)
}

/*insert into labels (label, graphs_labels_id) ✅
values ('Label 11', '3') */

// ? Testing required
const addToLabels = (label) => {
	return db('labels').insert(label)
}
/*insert into datasets (graphs_datasets_id)
values ('3');*/

// ? Testing required
const addToDatasets = (datasetid) => {
	return db('datasets').insert(datasetid).then((ids) => {
		return db('datasets').select({ id: ids[0] })
	})
}


/*insert into data (value, dataset_id)
values ('33', '3')*/

// ? Testing required 
const addDataToDataset = (data) => {
	console.log("Data from line 136 of Graphs Model", data)
	return db('data').insert(data)
}

// ? Testing required
const update = (userid, graphid, changes) => {
	return db('graphs').where({ graphid }).update(changes).then(() => {
		return graphs(userid)
	})
}

// ? Testing required

const remove = (id, userid) => {
	return db('graphs').where({ id }).del().then(() => {
		return graphs(userid)
	})
}

module.exports = {
	graphById, graphs, add, remove, update, addDataToDataset, addToDatasets, addToLabels, addToGraphs
}