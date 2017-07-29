'use strict';

module.exports = {
	listDomains() {
		const val = 'domains';
		return this.request(val, {val});
	}
};
