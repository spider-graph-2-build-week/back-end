require('dotenv').config()
const server = require('./server.js');
const request = require('supertest');

describe('GET', () => {
	test('process.env.JWT_SECRET exists', () => {
		expect(process.env.JWT_SECRET).toBeTruthy();
	})

	test('process.env.PORT exists', () => {
		expect(process.env.PORT).toBeTruthy();
	})

	test('Returning 200', () => {
		return request(server).get('/').expect(200)
	})
})