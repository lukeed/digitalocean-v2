'use strict';

/**
 * Create droplet actions endpoint
 * @param  {Integer} id The droplet ID
 * @return {String}     The relevent droplet URL
 */
function getActions(id) {
	return `droplets/${id}/actions`;
}

module.exports = {
	listDroplets: function () {
		const val = 'droplets';
		return this.request(val, {val});
	},

	getDroplet: function (id) {
		return this.request(`droplets/${id}`, {val: 'droplet'});
	},

	listDropletKernels: function (id) {
		const val = 'kernels';
		return this.request(`droplets/${id}/${val}`, {val});
	},

	listDropletSnapshots: function (id) {
		const val = 'snapshots';
		return this.request(`droplets/${id}/${val}`, {val});
	},

	listDropletBackups: function (id) {
		const val = 'backups';
		return this.request(`droplets/${id}/${val}`, {val});
	},

	listDropletActions: function (id) {
		const val = 'actions';
		return this.request(`droplets/${id}/${val}`, {val});
	},

	getDropletAction: function (dId, aId) {
		return this.request(`droplets/${dId}/actions/${aId}`, {val: 'action'});
	},

	createDroplet: function (options) {
		return this.request('droplets', {method: 'POST', body: options, val: 'droplet'});
	},

	deleteDroplet: function (id) {
		return this.request(`droplets/${id}`, {method: 'DELETE'});
	},

	resetDropletPassword: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'pw_reset'}
		});
	},

	powerOnDroplet: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'power_on'}
		});
	},

	powerOffDroplet: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'power_off'}
		});
	},

	powerCycleDroplet: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'power_cycle'}
		});
	},

	shutdownDroplet: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'shutdown'}
		});
	},

	rebootDroplet: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'reboot'}
		});
	},

	disableDropletBackups: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'disable_backups'}
		});
	},

	restoreDroplet: function (id, image) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'restore', image}
		});
	},

	rebuildDroplet: function (id, image) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'rebuild', image}
		});
	},

	resizeDroplet: function (id, size) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'resize', size}
		});
	},

	renameDroplet: function (id, name) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'rename', name}
		});
	},

	changeDropletKernel: function (id, kernel) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'change_kernel', kernel}
		});
	},

	enableDropletIpv6: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'enable_ipv6'}
		});
	},

	enableDropletPrivateNetworking: function (id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'enable_private_networking'}
		});
	},

	takeDropletSnapshot: function (id, name) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'snapshot', name}
		});
	}
};
