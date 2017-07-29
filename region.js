'use strict';

module.exports = {
	listRegions() {
		const val = 'regions';
		return this.request(val, {val});
	}
};
