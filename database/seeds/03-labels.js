exports.seed = function (knex) {
  return knex('labels').insert([
    { id: 1, graphs_labels_id: 1, label: "Label 1" },
    { id: 2, graphs_labels_id: 1, label: "Label 2" },
    { id: 3, graphs_labels_id: 1, label: "Label 3" },
    { id: 4, graphs_labels_id: 1, label: "Label 4" },
    { id: 5, graphs_labels_id: 1, label: "Label 5" },
    { id: 6, graphs_labels_id: 2, label: "Label 6" },
    { id: 7, graphs_labels_id: 2, label: "Label 7" },
    { id: 8, graphs_labels_id: 2, label: "Label 8" },
    { id: 9, graphs_labels_id: 2, label: "Label 9" },
    { id: 10, graphs_labels_id: 2, label: "Label 10" },
  ])
};
