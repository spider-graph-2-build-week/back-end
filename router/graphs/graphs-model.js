const db = require('../../database/db-config.js');


// Linking Graphs to Users
/*
select * from graphs
inner join users on graphs.user_id = users.id
and graphs.user_id = 1
*/
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
select L.id, L.label, L.graphs_labels_id from labels as L
inner join graphs as G on L.graphs_labels_id = G.id
and L.graphs_labels_id = 1
*/

const graphLabels = (id) => {
	return db('labels as l')
		.select("l.id", "l.label", "l.graphs_labels_id")
		.innerJoin('graphs as g', function () {
			this.on('l.graphs_labels_id', "=", "g.id").andOn('l.graphs_labels_id', '=', Number(id))
		})
}

// Adding Graph Data to Dataset

/* 
select d.id, d.dataset_id, d.value from dataset as ds
inner join data as d on ds.datasets_id = d.dataset_id
and ds.datasets_id = 2
group by d.id
*/
const graphData = (dataset) => {
	return db('dataset as ds')
		.select('*')
		.innerJoin('data as d', function () {
			this.on('ds.datasets_id', "=", "d.dataset_id").andOn('ds.datasets_id', '=', Number(dataset))
		})
		.groupBy("d.id")
}

// Add Dataset Labels per Dataset 
/*
select ds.graphs_datasets_id, dt.datasets_id, dt.dataset_label from datasets as ds
inner join dataset as dt on ds.graphs_datasets_id = dt.datasets_id and ds.graphs_datasets_id = 1
group by dt.dataset_label
*/
const datasetLabels = (datasets) => {
	return db("datasets as ds")
		.select('ds.id', 'dt.datasets_id', 'dt.dataset_label')
		.innerJoin('dataset as dt', function () {
			this.on('ds.graphs_datasets_id', '=', 'dt.datasets_id').andOn('ds.graphs_datasets_id', '=', Number(datasets))
		})
		.groupBy('dt.datasets_id')
}

// Linking the Datasets to Graphs by ID
/*
select d.dataset_label from dataset as d
inner join datasets as ds on d.datasets_id = ds.id and d.datasets_id = 1
*/
const graphDatasets = (id) => {
	return db('dataset as d')
		.select("d.dataset_label", "d.id")
		.innerJoin('datasets as ds', function () {
			this.on('d.datasets_id', '=', 'ds.id').andOn('d.datasets_id', '=', Number(id))
		})
}

const graphs = async (userid) => {
	try {
		const graphs = await graphById(userid);
		for (let graph of graphs) {
			graph.labels = await graphLabels(graph.id);
			graph.datasets = await graphDatasets(graph.id);
			for (let dataset of graph.datasets) {
				dataset.data = await graphData(dataset.id)
			}
			return graphs
		}
	} catch (e) {
		console.log(e.message)
	}
}

const add = (userid, graph) => {
	return db('graphs').insert(graph).then(graphs => {
		return graphs(userid)
	})
}

/*insert into graphs (title, description, user_id) ✅
values ( 'Title of Graph 5', 'This is a description of 5', '2'); */

const addToGraphs = (graph) => {
	return db('graphs').insert(graph)
}

/*insert into labels (label, graphs_labels_id) ✅
values ('Label 11', '3') */

const addToLabels = (label) => {
	return db('labels').insert(label)
}
/*insert into datasets (graphs_datasets_id)
values ('3');*/

const addToDatasets = (datasetid) => {
	return db('datasets').insert(datasetid)
}
/*insert into dataset (dataset_label, datasets_id)
values ('Dataset Label 5', '2')*/

const addLabelToDataset = (datasetLabel) => {
	return db('dataset').insert(datasetLabel)
}
/*insert into data (value, dataset_id)
values ('33', '3')*/

const addDataToDataset = (data) => {
	return db('dataset').insert(data)
}
const update = (userid, graphid, changes) => {
	return db('graphs').where({ graphid }).update(changes).then(() => {
		return graphs(userid)
	})
}

const remove = (userid, graphid) => {
	return db('graphs').where({ graphid }).del().then(() => {
		return graphs(userid)
	})
}

module.exports = {
	graphs, graphById, graphLabels, graphDatasets, datasetLabels, graphData, add, update, remove, addToDatasets, addToGraphs, addToLabels, addLabelToDataset, addDataToDataset
}