'use strict';

module.exports = {
	listDomains: function () {
		const val = 'domains';
		return this.request(val, {val});
	}
};
