import app from '../app';
import request from 'supertest';

/**
 * These are just some basic showcase tests.
 */
describe('GET /cities-by-tag', () => {
	test('should return 401 when authorization is missing', async() => {
		return request(app)
			.get('/cities-by-tag')
			.expect(401);
	});

	test('should return 401 on invalid authorization', async() => {
		return request(app)
			.get('/cities-by-tag')
			.set('authorization', 'bearer thewrongsecrettoken')
			.expect(401);
	});

	test('should return an error when no tag is provided', async() => {
		return request(app)
			.get('/cities-by-tag')
			.set('authorization', `bearer ${process.env.SECRET}`)
			.expect(400);
	});

	test('should return cities by providing a tag', async() => {
		return request(app)
			.get('/cities-by-tag')
			.query({tag: 'excepteurus'})
			.set('authorization', `bearer ${process.env.SECRET}`)
			.expect(200)
			.expect(res => {
				expect(res.body.cities.length).toBe(1);
			});
	});

	test('should return inactive providing isActive=false', async() => {
		return request(app)
			.get('/cities-by-tag')
			.query({
				isActive: 'false',
				tag: 'excepteurus',
			})
			.set('authorization', `bearer ${process.env.SECRET}`)
			.expect(200)
			.expect(res => {
				expect(res.body.cities.length).toBe(2);
			});
	});
});