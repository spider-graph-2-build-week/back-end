exports.seed = function (knex) {
  return knex('graphs').insert([
    { id: 1, user_id: 1, title: "Title of Graph (Unique)", description: "This is a description" },
    { id: 2, user_id: 1, title: "Title of Graph 2", description: "This is a description" },
  ])
};
