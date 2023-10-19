import Address from './Address';

type CitiesJSON = {
	cities: Address[]
}

export default class Cities {

	/**
	 * To be used client-side once putting the class into a separate package.
	 */
	static newFromJSON(json: CitiesJSON) {
		return new Cities(json.cities);
	}

	readonly addresses: Address[] = [];

	constructor(addresses: Address[]) {
		this.addresses = addresses;
	}

	toJSON() {
		return {
			cities: this.addresses,
		};
	}
}