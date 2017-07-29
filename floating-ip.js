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
	listFloatingIPs() {
		const val = 'floating_ips';
		return this.request(val, {val});
	},

	getFloatingIP(ip) {
		return this.request(`floating_ips/${ip}`, {val: 'floating_ip'});
	},

	createFloatingIP(body) {
		if (body.droplet_id && body.region) {
			throw new Error('Please only specify either a droplet_id or a region (not both) when creating a new Floating IP.');
		}

		if (!body.droplet_id && !body.region) {
			throw new Error('Please specify either a droplet_id or a region for this Floating IP.');
		}

		return this.request('floating_ips', {method: 'POST', val: 'floating_ip', body});
	},

	deleteFloatingIP(id) {
		return this.request(`floating_ips/${id}`, {method: 'DELETE'});
	},

	listFloatingIPActions(ip) {
		const val = 'actions';
		return this.request(`floating_ips/${ip}/${val}`, {val});
	},

	getFloatingIPAction(ip, aId) {
		return this.request(`floating_ips/${ip}/actions/${aId}`, {val: 'action'});
	},

	assignFloatingIP(ip, dropletId) {
		return this.request(getActions(ip), {
			method: 'POST',
			body: {type: 'assign', droplet_id: dropletId}
		});
	},

	unassignFloatingIP(ip) {
		return this.request(getActions(ip), {
			method: 'POST',
			body: {type: 'unassign'}
		});
	}
};
