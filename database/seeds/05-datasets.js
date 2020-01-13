exports.seed = function (knex) {
  return knex('datasets').insert([
    { id: 1, graph_datasets_id: 1, dataset_label: "Dataset Label 1" },
    { id: 2, graph_datasets_id: 1, dataset_label: "Dataset Label 2" },
    { id: 3, graph_datasets_id: 2, dataset_label: "Dataset Label 3" },
    { id: 4, graph_datasets_id: 2, dataset_label: "Dataset Label 4" },
  ])
};
