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
const graphData = (location) => {
	return db('dataset as ds')
		.select("d.id", 'd.dataset_id', 'd.value')
		.innerJoin('data as d', function () {
			this.on('ds.datasets_id', "=", "d.dataset_id").andOn('ds.datasets_id', '=', Number(location))
		})
}

// Add Dataset Labels per Dataset 
/*
select ds.graphs_datasets_id, dt.datasets_id, dt.dataset_label from datasets as ds
inner join dataset as dt on ds.graphs_datasets_id = dt.datasets_id and ds.graphs_datasets_id = 1
group by dt.dataset_label
*/



// Linking the Datasets to Graphs by ID
const graphDatasets = (id) => {
	return db('datasets as d')
		.select('*')
		.innerJoin('graphs as g', function () {
			this.on('d.graphs_datasets_id', "=", "g.id").andOn('l.graphs_datasets_id', "=", Number(id))
		})
}

const graphs = (id) => {
	return db('graphs')
}

module.exports = {
	graphs, graphById, graphLabels, graphDatasets
}