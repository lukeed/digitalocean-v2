'use strict';

const API = require('./core');

// assemble the complete prototype
API.prototype.inject(
	require('./account'),
	require('./domain'),
	require('./droplet'),
	require('./image'),
	require('./volume')
);

// send out everything!
module.exports = API;
