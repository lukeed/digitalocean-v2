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
	listVolumes: function () {
		const val = 'volumes';
		return this.request(val, {val});
	},

	createVolume: function (options) {
		return this.request('volumes', {method: 'POST', body: options, val: 'volume'});
	},

	getVolume: function (id) {
		return this.request(`volumes/${id}`, {val: 'volume'});
	},

	getVolumeByName: function (name, region) {
		return this.request(`volumes?name=${name}&region=${region}`, {val: 'volumes'});
	},

	listVolumeSnapshots: function (id) {
		const val = 'snapshots';
		return this.request(`volumes/${id}/${val}`, {val});
	},

	takeVolumeSnapshot: function (id, name) {
		return this.request(`volumes/${id}/snapshots`, {
			method: 'POST',
			body: {name},
			val: 'snapshot'
		});
	},

	deleteVolume: function (id) {
		return this.request(`volumes/${id}`, {method: 'DELETE'});
	},

	deleteVolumeByName: function (name, region) {
		return this.request(`volumes?name=${name}&region=${region}`, {method: 'DELETE'});
	},

	listVolumeActions: function (id) {
		const val = 'actions';
		return this.request(`volumes/${id}/${val}`, {val});
	},

	attachVolume: function (volumeId, dropletId) {
		return this.request(getActions(volumeId), {
			method: 'POST',
			body: {type: 'attach', droplet_id: dropletId} // eslint-disable-line camelcase
		});
	},

	detachVolume: function (volumeId, dropletId) {
		return this.request(getActions(volumeId), {
			method: 'POST',
			body: {type: 'detach', droplet_id: dropletId} // eslint-disable-line camelcase
		});
	},

	resizeVolume: function (id, size) {
		return this.request(getActions(id), {
			method: 'POST',
			body: {type: 'resize', size_gigabytes: size} // eslint-disable-line camelcase
		});
	},

	getVolumeAction: function (vId, aId) {
		return this.request(`volumes/${vId}/actions/${aId}`, {val: 'action'});
	}
};
