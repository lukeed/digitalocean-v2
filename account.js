'use strict';

module.exports = {
	getUser: function () {
		const val = 'account';
		return this.request(val, {val});
	},

	listActions: function () {
		const val = 'actions';
		return this.request(val, {val});
	},

	getAction: function (id) {
		return this.request(`actions/${id}`, {val: 'action'});
	}
};
