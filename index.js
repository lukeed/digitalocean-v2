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

module.exports = API;
