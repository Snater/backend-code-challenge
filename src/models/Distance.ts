import Address from './Address';
import Unit from './Unit';

type DistanceJSON = {
	distance: number
	unit: Unit
	from: Address
	to: Address
}

export default class Distance {

	/**
	 * To be used client-side once putting the class into a separate package.
	 */
	static newFromJSON(json: DistanceJSON) {
		return new Distance(json.distance, json.unit, json.from, json.to);
	}

	readonly distance;
	readonly unit;
	readonly from;
	readonly to;

	constructor(distance: number, unit: Unit, from: Address, to: Address) {
		this.distance = distance;
		this.unit = unit;
		this.from = from;
		this.to = to;
	}

	toJSON() {
		return {
			distance: this.distance,
			unit: this.unit,
			from: this.from,
			to: this.to,
		};
	}
}