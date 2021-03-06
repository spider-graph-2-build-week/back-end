
exports.up = function (knex) {
	return knex.schema
		.createTable('users', column => {
			column.increments();
			column.string('username', 128).notNullable().unique()
			column.string('password', 128).notNullable()
		})
		.createTable('graphs', column => {
			column.increments();
			column.string('title').notNullable().unique()
			column.string('description')
			column.integer('user_id')
				.unsigned()
				.references('users.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('labels', column => {
			column.increments();
			column.string('label').notNullable()
			column.integer('graph_labels_id')
				.unsigned()
				.references('graphs.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('datasets', column => {
			column.increments();
			column.string('dataset_label').notNullable()
			column.integer('graph_datasets_id')
				.unsigned()
				.references('graphs.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})
		.createTable('data', column => {
			column.increments();
			column.integer('value').notNullable()
			column.integer('dataset_id')
				.unsigned()
				.references('datasets.id')
				.onDelete('CASCADE')
				.onUpdate('CASCADE')
		})

};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('data')
		.dropTableIfExists('datasets')
		.dropTableIfExists('labels')
		.dropTableIfExists('graphs')
		.dropTableIfExists('users')
};




const dbShape = {
	id: 1,
	username: '',
	firstName: '',
	lastname: '',
	graphs: [
		{
			id: 1,
			title: '',
			description: '',
			labels: ["ONe", "tWo"],
			datasets: [
				{
					id: 1,
					dataset_label: "ONe",
					data: [1, 2, 3, 4]
				},
				{
					id: 2,
					dataset_label: "tWo",
					data: [5, 6, 7, 8]
				}
			]
		},
		{
			id: 2,
			title: '',
			description: '',
			labels: ["", ""],
			datasets: [
				{
					id: 1,
					label: "",
					data: [1, 2, 3, 4]
				},
				{
					id: 2,
					label: "",
					data: [5, 6, 7, 8]
				}
			]
		}
	]
}

