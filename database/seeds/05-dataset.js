exports.seed = function (knex) {
  return knex('dataset').insert([
    { id: 1, datasets_id: 1, dataset_label: "Dataset Label 1" },
    { id: 2, datasets_id: 1, dataset_label: "Dataset Label 2" },
    { id: 3, datasets_id: 1, dataset_label: "Dataset Label 3" },
    { id: 4, datasets_id: 2, dataset_label: "Dataset Label 4" },
  ])
};
