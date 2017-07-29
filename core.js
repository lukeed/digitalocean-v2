'use strict';

const fetch = require('node-fetch');

const BASE = 'https://api.digitalocean.com/v2';

function handle(res) {
	if (res.status === 204) {
		return res.text();
	}
	if (res.ok) {
		return res.json();
	}
	return {
		code: res.status,
		message: res.statusText
	};
}

function API(opts) {
	if (!opts || !opts.token) {
		throw new Error('Expecting an access token');
	}

	this.headers = {
		Authorization: `Bearer ${opts.token}`,
		'Content-Type': 'application/json'
	};
}

/**
 * Base Request method
 * @param  {Object} opts HTTP options object
 * @return {Promise}
 */
API.prototype.request = function (uri, opts) {
	uri = `${BASE}/${uri}`;

	opts = Object.assign({headers: this.headers}, opts);
	opts.method = (opts.method || 'get').toLowerCase();

	if (opts.body) {
		opts.body = JSON.stringify(opts.body);
	}

	const key = opts.val;

	return fetch(uri, opts).then(handle).then(data => data[key] || data);
};

/**
 * Inject/Assign Prototype Objects!
 * @return {Object} The final API function
 */
API.prototype.inject = function () {
	const args = [].slice.call(arguments).concat(this);
	API.prototype = Object.assign.apply(null, args);
	return API;
};

module.exports = API;
