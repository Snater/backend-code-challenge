import {expect, test, describe} from 'bun:test';
import app from './app';

const base = 'http://hostname';

/**
 * These are just some basic showcase tests.
 */
describe('GET /cities-by-tag', () => {
	test('should return 401 when authorization is missing', async() => {
		const res = await app(new Request(`${base}/cities-by-tag`));
		expect(res.status).toBe(401);
	});

	test('should return 401 on invalid authorization', async() => {
		const res = await app(
			new Request(`${base}/cities-by-tag`,
				{headers: {'authorization': 'bearer thewrongsecrettoken'}}
			)
		);

		expect(res.status).toBe(401);
	});

	test('should return an error when no tag is provided', async() => {
		const res = await app(
			new Request(
				`${base}/cities-by-tag`,
				{headers: {'authorization': `bearer ${process.env.SECRET}`}}
			)
		);

		expect(res.status).toBe(400);
	});

	test('should return cities by providing a tag', async() => {
		const res = await app(
			new Request(
				`${base}/cities-by-tag?tag=excepteurus`,
				{headers: {'authorization': `bearer ${process.env.SECRET}`}}
			)
		);

		expect(res.status).toBe(200);

		const json = await res.json();

		expect(json.cities.length).toBe(1);
	});

	test('should return inactive providing isActive=false', async() => {
		const res = await app(
			new Request(
				`${base}/cities-by-tag?tag=excepteurus&isActive=false`,
				{headers: {'authorization': `bearer ${process.env.SECRET}`}}
			)
		);

		expect(res.status).toBe(200);

		const json = await res.json();

		expect(json.cities.length).toBe(2);
	});
});
