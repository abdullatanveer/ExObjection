// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

   
  development: {
    client: 'pg',
    connection: {
      database: 'HumpyDB',
      user:     'postgres',
      password: "postgres",
    },
    pool: {
      min: 2,
      max: 10,

    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      directory:'./seeds'
    }

  },

   
 

};
