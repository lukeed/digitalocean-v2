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
API.prototype.request = function(endpt, opts) {
  endpt = `${host}/${endpt}`;
  opts = assign(opts || {}, this.config);
  const act = (opts.method || 'get').toLowerCase();

  // console.log(endpt, act);
  // console.log(opts);

  return got[act](endpt, opts).catch(err => {
    console.log('error!', err);
  }).then(data =>
    (opts.val) ? data.body[opts.val] : data.body);
};

/**
 * Get the User's Account Info
 * @return {Promise}
 */
API.prototype.getUserInfo = function () {
  const val = 'account';
  return this.request(val, {val});
};

API.prototype.listActions = function () {
  const val = 'actions';
  return this.request(val, {val});
};

API.prototype.getAction = function (id) {
  return this.request(`actions/${id}`, {val: 'action'});
};

API.prototype.listDomains = function () {
  const val = 'domains';
  return this.request(val, {val});
};

API.prototype.listDroplets = function () {
  const val = 'droplets';
  return this.request(val, {val});
};

API.prototype.getDroplet = function (id) {
  return this.request(`droplets/${id}`, {val: 'droplet'});
};

API.prototype.listDropletKernels = function (id) {
  const val = 'kernels';
  return this.request(`droplets/${id}/${val}`, {val});
};

API.prototype.listDropletSnapshots = function (id) {
  const val = 'snapshots';
  return this.request(`droplets/${id}/${val}`, {val});
};

API.prototype.listDropletBackups = function (id) {
  const val = 'backups';
  return this.request(`droplets/${id}/${val}`, {val});
};

API.prototype.listDropletActions = function (id) {
  const val = 'actions';
  return this.request(`droplets/${id}/${val}`, {val});
};

API.prototype.getDropletAction = function (dId, aId) {
  return this.request(`droplets/${dId}/actions/${aId}`, {val: 'action'});
};

API.prototype.createDroplet = function (options) {
  return this.request('droplets', {method: 'POST', body: options, val: 'droplet'});
};

API.prototype.deleteDroplet = function (id) {
  return this.request(`droplets/${id}`, {method: 'DELETE'});
};

/**
 * Create droplet actions endpoint
 * @param  {Integer} id The droplet ID
 * @return {String}     The relevent droplet URL
 */
function getActions(id) {
  return `droplets/${id}/actions`;
}

API.prototype.resetDropletPassword = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'pw_reset'}
  });
};

API.prototype.powerOnDroplet = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'power_on'}
  });
};

API.prototype.powerOffDroplet = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'power_off'}
  });
};

API.prototype.powerCycleDroplet = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'power_cycle'}
  });
};

API.prototype.shutdownDroplet = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'shutdown'}
  });
};

API.prototype.rebootDroplet = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'reboot'}
  });
};

API.prototype.disableDropletBackups = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'disable_backups'}
  });
};

API.prototype.disableDropletBackups = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'disable_backups'}
  });
};

API.prototype.restoreDroplet = function (id, image) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'restore', image}
  });
};

API.prototype.rebuildDroplet = function (id, image) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'rebuild', image}
  });
};

API.prototype.resizeDroplet = function (id, size) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'resize', size}
  });
};

API.prototype.renameDroplet = function (id, name) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'rename', name}
  });
};

API.prototype.changeDropletKernel = function (id, kernel) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'change_kernel', kernel}
  });
};

API.prototype.enableDropletIpv6 = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'enable_ipv6'}
  });
};

API.prototype.enableDropletPrivateNetworking = function (id) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'enable_private_networking'}
  });
};

API.prototype.takeDropletSnapshot = function (id, name) {
  return this.request(getActions(id), {
    method: 'POST',
    body: {type: 'snapshot', name}
  });
};

module.exports = API;
