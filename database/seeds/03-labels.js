exports.seed = function (knex) {
  return knex('labels').insert([
    { id: 1, graph_labels_id: 1, label: "Label 1" },
    { id: 2, graph_labels_id: 1, label: "Label 2" },
    { id: 3, graph_labels_id: 1, label: "Label 3" },
    { id: 4, graph_labels_id: 1, label: "Label 4" },
    { id: 5, graph_labels_id: 1, label: "Label 5" },
    { id: 6, graph_labels_id: 2, label: "Label 6" },
    { id: 7, graph_labels_id: 2, label: "Label 7" },
    { id: 8, graph_labels_id: 2, label: "Label 8" },
    { id: 9, graph_labels_id: 2, label: "Label 9" },
    { id: 10, graph_labels_id: 2, label: "Label 10" },
  ])
};
// I think that graph labels_id must be passed in from the front end. It should be there to allow the application to know which graph to associate with.
