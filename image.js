'use strict';

const assign = require('object-assign');

module.exports = {
  listImages: function (obj) {
    const val = 'images';
    obj = assign({val}, obj);
    return this.request(val, obj);
  },

  listDistributionImages: function () {
    const type = 'distribution';
    return this.listImages({query: {type}});
  },

  listApplicationImages: function () {
    const type = 'application';
    return this.listImages({query: {type}});
  },

  /**
   * Get a single Image
   * @param  {Integer|String} id  The image's id or slug
   * @return {Promise}
   */
  getImage: function (id) {
    const val = 'image';
    return this.request(`images/${id}`, {val});
  },

  renameImage: function (id, name) {
    return this.request(`images/${id}`, {
      method: 'POST',
      body: {name},
      val: 'image'
    });
  },

  transferImage: function (id, region) {
    return this.request(`images/${id}/actions`, {
      body: {type: 'transfer', region},
      method: 'POST',
      val: 'action'
    });
  },

  deleteImage: function (id, name) {
    return this.request(`images/${id}`, {method: 'DELETE'});
  }
};
