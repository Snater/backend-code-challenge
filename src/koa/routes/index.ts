import {allCities} from '../controllers/allCitiesController';
import {area} from '../controllers/areaController';
import {areaResult} from '../controllers/areaResultController';
import {distance} from '../controllers/distanceController';
import {citiesByTag} from '../controllers/queryController';
import {index} from '../controllers/staticController';
import {default as koaRouter, Joi} from 'koa-joi-router';

const router = koaRouter();

router.get('/', index);

router.get('/all-cities', allCities);

router.get(
	'/area',
	{
		validate: {
			query: Joi.object({
				from: Joi.string().guid().required(),
				distance: Joi.number().required(),
			}),
		},
	},
	area
);

router.get(
	'/area-result/:guid',
	{
		validate: {
			params: Joi.object({
				guid: Joi.string().guid().required(),
			}),
		},
	},
	areaResult
);

router.get(
	'/cities-by-tag',
	{
		validate: {
			query: Joi.object({
				isActive: Joi.string(),
				tag: Joi.string().required(),
			}),
		},
	},
	citiesByTag
);

router.get(
	'/distance',
	{
		validate: {
			query: Joi.object({
				from: Joi.string().guid().required(),
				to: Joi.string().guid().required(),
				unit: Joi.string().default('km').custom((value, helpers) => {
					return ['km', 'mi'].includes(value) ? value : helpers.error('any.invalid');
				}),
			}),
		},
	},
	distance
);

export default router;