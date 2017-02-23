'use strict';

/**
 * Create floating IP actions endpoint
 * @param  {Integer} ip The floating IP in question
 * @return {String}     The relevent volume URL
 */
function getActions(ip) {
	return `floating_ips/${ip}/actions`;
}

module.exports = {
	listFloatingIPs: function () {
		const val = 'floating_ips';
		return this.request(val, {val});
	},

	getFloatingIP: function (ip) {
		return this.request(`floating_ips/${ip}`, {val: 'floating_ip'});
	},

	createFloatingIP: function (body) {
		if (body.droplet_id && body.region) { // eslint-disable-line camelcase
			throw new Error('Please only specify either a droplet_id or a region (not both) when creating a new Floating IP.');
		}

		if (!body.droplet_id && !body.region) { // eslint-disable-line camelcase
			throw new Error('Please specify either a droplet_id or a region for this Floating IP.');
		}

		return this.request('floating_ips', {method: 'POST', val: 'floating_ip', body});
	},

	deleteFloatingIP: function (id) {
		return this.request(`floating_ips/${id}`, {method: 'DELETE'});
	},

	listFloatingIPActions: function (ip) {
		const val = 'actions';
		return this.request(`floating_ips/${ip}/${val}`, {val});
	},

	getFloatingIPAction: function (ip, aId) {
		return this.request(`floating_ips/${ip}/actions/${aId}`, {val: 'action'});
	},

	assignFloatingIP: function (ip, dropletId) {
		return this.request(getActions(ip), {
			method: 'POST',
			body: {type: 'assign', droplet_id: dropletId} // eslint-disable-line camelcase
		});
	},

	unassignFloatingIP: function (ip) {
		return this.request(getActions(ip), {
			method: 'POST',
			body: {type: 'unassign'} // eslint-disable-line camelcase
		});
	}
};
