exports.seed = function (knex) {
  return knex('datasets').insert([
    { id: 1, graphs_datasets_id: 1 },
    { id: 2, graphs_datasets_id: 1 },
    { id: 3, graphs_datasets_id: 1 },
    { id: 4, graphs_datasets_id: 2 },
    { id: 5, graphs_datasets_id: 2 },
    { id: 6, graphs_datasets_id: 2 },
  ])
};
