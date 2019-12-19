module.exports = {
	development: {
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: './database/testing-back-end.db3',
		},
		pool: {
			afterCreate: (connection, done) => {
				connection.run('PRAGMA foreign_keys = ON', done);
			}
		},
		migrations: {
			directory: "./database/migrations",
		},
		seeds: {
			directory: './database/seeds'
		}
	},
	testing: {
		client: "sqlite3",
		connection: {
			filename: "./database/test.db3",
		},
		useNullAsDefault: true,
		migrations: {
			directory: './database/migrations',
		},
		seeds: {
			directory: './database/seeds'
		}
	}
}