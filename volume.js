'use strict';

/**
 * Create volume actions endpoint
 * @param  {Integer} id The volume ID
 * @return {String}     The relevent volume URL
 */
function getActions(id) {
	return `volumes/${id}/actions`;
}

module.exports = {
	listVolumes(region) {
		const val = 'volumes';

		const options = {val};

		if (region) {
			options.query = {region};
		}

		return this.request(val, options);
	},

	createVolume(options) {
		return this.request('volumes', {method: 'POST', body: options, val: 'volume'});
	},

	getVolume(id) {
		return this.request(`volumes/${id}`, {val: 'volume'});
	},

	getVolumeByName(name, region) {
		return this.request(`volumes?name=${name}&region=${region}`, {val: 'volumes'});
	},

	listVolumeSnapshots(id) {
		const val = 'snapshots';
		return this.request(`volumes/${id}/${val}`, {val});
	},

	takeVolumeSnapshot(id, name) {
		return this.request(`volumes/${id}/snapshots`, {
			method: 'POST',
			body: {name},
			val: 'snapshot'
		});
	},

	deleteVolume(id) {
		return this.request(`volumes/${id}`, {method: 'DELETE'});
	},

	deleteVolumeByName(name, region) {
		return this.request(`volumes?name=${name}&region=${region}`, {method: 'DELETE'});
	},

	listVolumeActions(id) {
		const val = 'actions';
		return this.request(`volumes/${id}/${val}`, {val});
	},

	attachVolume(volumeId, dropletId) {
		return this.request(getActions(volumeId), {
			method: 'POST',
			body: {type: 'attach', droplet_id: dropletId}
		});
	},

	detachVolume(volumeId, dropletId) {
		return this.request(getActions(volumeId), {
			method: 'POST',
			body: {type: 'detach', droplet_id: dropletId}
		});
	},

	resizeVolume(id, size) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'resize', size_gigabytes: size}
		});
	},

	getVolumeAction(vId, aId) {
		return this.request(`volumes/${vId}/actions/${aId}`, {val: 'action'});
	}
};
