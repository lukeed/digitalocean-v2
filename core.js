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
			'Authorization': `Bearer ${opts.token}`,
			'Content-Type': 'application/json'
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

	// serialize payload to JSON
	if (opts.body) {
		opts.body = JSON.stringify(opts.body);
	}

	return got[act](endpt, opts).catch(err => {
		err = {code: err.statusCode, message: err.statusMessage};
		console.error('API Error:', err);
		return err;
	}).then(data =>
		(opts.val) ? data.body[opts.val] : data.body);
};

/**
 * Inject/Assign Prototype Objects!
 * @return {Object} The final API function
 */
API.prototype.inject = function () {
	const args = [].slice.call(arguments).concat(this);
	API.prototype = assign.apply(null, args);
	return API;
};

module.exports = API;
