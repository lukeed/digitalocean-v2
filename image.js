'use strict';

module.exports = {
	listImages(obj) {
		const val = 'images';
		obj = Object.assign({val}, obj);
		return this.request(val, obj);
	},

	listDistributionImages() {
		const type = 'distribution';
		return this.listImages({query: {type}});
	},

	listApplicationImages() {
		const type = 'application';
		return this.listImages({query: {type}});
	},

	/**
	 * Get a single Image
	 * @param  {Integer|String} id  The image's id or slug
	 * @return {Promise}
	 */
	getImage(id) {
		const val = 'image';
		return this.request(`images/${id}`, {val});
	},

	renameImage(id, name) {
		return this.request(`images/${id}`, {
			method: 'POST',
			body: {name},
			val: 'image'
		});
	},

	transferImage(id, region) {
		return this.request(`images/${id}/actions`, {
			body: {type: 'transfer', region},
			method: 'POST',
			val: 'action'
		});
	},

	deleteImage(id) {
		return this.request(`images/${id}`, {method: 'DELETE'});
	}
};
