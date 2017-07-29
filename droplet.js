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
	listDroplets() {
		const val = 'droplets';
		return this.request(val, {val});
	},

	getDroplet(id) {
		return this.request(`droplets/${id}`, {val: 'droplet'});
	},

	listDropletKernels(id) {
		const val = 'kernels';
		return this.request(`droplets/${id}/${val}`, {val});
	},

	listDropletSnapshots(id) {
		const val = 'snapshots';
		return this.request(`droplets/${id}/${val}`, {val});
	},

	listDropletBackups(id) {
		const val = 'backups';
		return this.request(`droplets/${id}/${val}`, {val});
	},

	listDropletActions(id) {
		const val = 'actions';
		return this.request(`droplets/${id}/${val}`, {val});
	},

	getDropletAction(dId, aId) {
		return this.request(`droplets/${dId}/actions/${aId}`, {val: 'action'});
	},

	createDroplet(options) {
		return this.request('droplets', {method: 'POST', body: options, val: 'droplet'});
	},

	deleteDroplet(id) {
		return this.request(`droplets/${id}`, {method: 'DELETE'});
	},

	resetDropletPassword(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'pw_reset'}
		});
	},

	powerOnDroplet(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'power_on'}
		});
	},

	powerOffDroplet(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'power_off'}
		});
	},

	powerCycleDroplet(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'power_cycle'}
		});
	},

	shutdownDroplet(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'shutdown'}
		});
	},

	rebootDroplet(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'reboot'}
		});
	},

	disableDropletBackups(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'disable_backups'}
		});
	},

	restoreDroplet(id, image) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'restore', image}
		});
	},

	rebuildDroplet(id, image) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'rebuild', image}
		});
	},

	resizeDroplet(id, size) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'resize', size}
		});
	},

	renameDroplet(id, name) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'rename', name}
		});
	},

	changeDropletKernel(id, kernel) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'change_kernel', kernel}
		});
	},

	enableDropletIpv6(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'enable_ipv6'}
		});
	},

	enableDropletPrivateNetworking(id) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'enable_private_networking'}
		});
	},

	takeDropletSnapshot(id, name) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'snapshot', name}
		});
	}
};
