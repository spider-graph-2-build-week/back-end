exports.seed = function (knex) {
  return knex('users').insert([
    { id: 1, username: "Test1", password: "test1234" },
    { id: 2, username: "Test2", password: "test1234" }
  ])
};
