'use strict';

module.exports = {
	getUser() {
		const val = 'account';
		return this.request(val, {val});
	},

	listActions() {
		const val = 'actions';
		return this.request(val, {val});
	},

	getAction(id) {
		return this.request(`actions/${id}`, {val: 'action'});
	}
};
