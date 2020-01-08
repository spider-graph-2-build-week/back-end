exports.seed = function (knex) {
  return knex('data').insert([
    { id: 1, dataset_id: 1, value: 25 },
    { id: 2, dataset_id: 1, value: 55 },
    { id: 3, dataset_id: 1, value: 44 },
    { id: 4, dataset_id: 1, value: 32 },
    { id: 5, dataset_id: 1, value: 65 },
    { id: 6, dataset_id: 1, value: 22 },
    { id: 7, dataset_id: 2, value: 68 },
    { id: 8, dataset_id: 2, value: 82 },
    { id: 9, dataset_id: 2, value: 36 },
    { id: 10, dataset_id: 2, value: 17 },
    { id: 11, dataset_id: 2, value: 49 },
    { id: 12, dataset_id: 2, value: 75 },
  ])
};
