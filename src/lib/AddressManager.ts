import Address from '../models/Address';
import Query from '../models/Query';
import Unit from '../models/Unit';
import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import spherical from 'spherical';

export default class AddressManager {

	private static readonly kmToMile = 0.6214;

	/**
	 * The addresses are purely static, so there is no need to read them on each operation.
	 */
	private static addresses: Address[] = [];

	private static getAddresses() {
		if (AddressManager.addresses.length === 0) {
			this.addresses = JSON.parse(
				fs.readFileSync(path.join(__dirname, '..', '..', 'addresses.json'), 'utf8')
			) as Address[];
		}

		return this.addresses;
	}

	static calculateDistance(from: Address, to: Address, unit: Unit = 'km'): number {
		const distance = spherical.distance(
			[from.longitude, from.latitude],
			[to.longitude, to.latitude],
			6371
		);

		const km = Math.round(distance * 100) / 100;

		return unit === 'km' ? km : km * AddressManager.kmToMile;
	}

	static findAddresses(...guids: string[]): (Address|undefined)[] {
		const addresses: (Address|undefined)[] = [];

		_.forEach(AddressManager.getAddresses(), (address: Address) => {
			_.forEach(guids, (guid, key) => {
				if (guid === address.guid) {
					addresses[key] = address;
				}
			});

			return !addresses.includes(undefined);
		});

		return addresses;
	}

	static findAddressesWithinDistance(from: string, distance: number): Address[] {
		const addresses = AddressManager.getAddresses();

		const addressFrom = _.find(addresses, (address: Address) => {
			return address.guid === from;
		});

		return addressFrom === undefined
			? []
			: _.filter(addresses, (address: Address) => {
				const addressDistance = spherical.distance(
					[addressFrom.longitude, addressFrom.latitude],
					[address.longitude, address.latitude],
					6371
				);

				return addressDistance <= distance && address.guid !== addressFrom.guid;
			});
	}

	static queryAddresses(query: Query) {
		return _.filter(AddressManager.getAddresses(), (address: Address) => {
			if (query.guid && query.guid !== address.guid) {
				return false;
			}
			if (query.isActive && query.isActive !== address.isActive) {
				return false;
			}
			if (query.address && query.address !== address.address) {
				return false;
			}
			if (query.latitude && query.latitude !== address.latitude) {
				return false;
			}
			if (query.longitude && query.longitude !== address.longitude) {
				return false;
			}
			if (query.tags && _.intersection(query.tags, address.tags).length === 0) {
				return false;
			}
			return true;
		});
	}
}