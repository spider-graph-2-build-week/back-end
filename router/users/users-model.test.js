const db = require('../../database/db-config.js');
const Users = require('./users-model.js');

describe('User Model Testing', () => {
	beforeEach(async () => {
		await db('users').truncate();
	});

	describe('Removing user', () => {
		test("Remove user", async () => {
			let users;
			users = await db('users');
			expect(users).toHaveLength(0);

			// Add two users. Users === 2
			await Users.add({ id: 1, username: "Test1", password: "test1234" });
			await Users.add({ id: 2, username: "Test2", password: "test1234" });

			// Refresh Users
			users = await db('users')
			expect(users).toHaveLength(2);

			// Remove user 2
			await Users.remove(2);

			// Refresh Users
			users = await db('users')
			expect(users).toHaveLength(1)
		});

		test('Adding users', async () => {
			let users;
			users = await db('users');
			expect(users).toHaveLength(0);

			// Add two users. Users === 2
			await Users.add({ id: 1, username: "Test1", password: "test1234" });
			await Users.add({ id: 2, username: "Test2", password: "test1234" });
		})
	})
})