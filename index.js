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
    (opts._key) ? data.body[opts._key] : data.body);
};

API.prototype.getUserInfo = function () {
  return this.request('account', {_key: 'account'});
};

module.exports = API;
