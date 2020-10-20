exports.seed = function(knex) {
  const owners = [
    {
      // id: 1
      username: 'test',
      password: 'test123'
    },
    {
      // id: 2
      username: 'eli',
      password: 'eli123'
    }
  ]

  return knex('owners').insert(owners);
}