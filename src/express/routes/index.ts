import {allCities} from '../controllers/allCitiesController';
import {area} from '../controllers/areaController';
import {areaResult} from '../controllers/areaResultController';
import {distance} from '../controllers/distanceController';
import {citiesByTag} from '../controllers/queryController';
import {index} from '../controllers/staticController';
import {Router} from 'express';
import {createValidator} from 'express-joi-validation';
import Joi from 'joi';

const router = Router();
const validator = createValidator();

router.get('/', index);

router.get('/all-cities', allCities);

router.get(
	'/area',
	validator.query(Joi.object({
		from: Joi.string().guid().required(),
		distance: Joi.number().required(),
	})),
	area
);

router.get(
	'/area-result/:guid',
	validator.params(Joi.object({
		guid: Joi.string().guid().required(),
	})),
	areaResult
);

router.get(
	'/cities-by-tag',
	validator.query(Joi.object({
		isActive: Joi.string(),
		tag: Joi.string().required(),
	})),
	citiesByTag
);

router.get(
	'/distance',
	validator.query(Joi.object({
		from: Joi.string().guid().required(),
		to: Joi.string().guid().required(),
		unit: Joi.string().default('km').custom((value, helpers) => {
			return ['km', 'mi'].includes(value) ? value : helpers.error('any.invalid');
		}),
	})),
	distance
);

export default router;