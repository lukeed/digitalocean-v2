'use strict';

const got = require('got');
const assign = require('object-assign');
const host = 'https://api.digitalocean.com/v2';

function API(opts) {
	if (!opts.token) {
		throw new Error('Expecting an access token');
	}

	this.config = {
		json: true,
		headers: {
			Authorization: `Bearer ${opts.token}`
		}
	};
}

/**
 * Base Request method
 * @param  {Object} opts HTTP options object
 * @return {Promise}
 */
API.prototype.request = function (endpt, opts) {
	endpt = `${host}/${endpt}`;
	opts = assign(opts || {}, this.config);
	const act = (opts.method || 'get').toLowerCase();

	return got[act](endpt, opts).catch(err => {
		/** @todo better error handing, throw `got` errors */
		console.log('error!', err);
	}).then(data =>
		(opts.val) ? data.body[opts.val] : data.body);
};

/**
 * Inject/Assign Prototype Objects!
 * @return {Object} The final API function
 */
API.prototype.inject = function () {
	const args = [].slice.call(arguments).concat(API.prototype);
	API.prototype = assign.apply(null, args);
	return API;
};

module.exports = API;
