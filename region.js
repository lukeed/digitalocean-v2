'use strict';

module.exports = {
	listRegions: function () {
		const val = 'regions';
		return this.request(val, {val});
	}
};
