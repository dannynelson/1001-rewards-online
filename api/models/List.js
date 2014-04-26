/**
* List.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var indexInstance = function (data, next) {
  ElasticSearchService.index(data);
  next();
};

var updateImage = function(data, next) {
  if (data.imageUri && data.imageUri.substr(0,5) === 'data:') {
    S3Service.uploadDataUri(data.imageUri, function(retrievedImage) {
      data.imageUri = retrievedImage;
      next();
    });
  } else {
    next();
  }
};

module.exports = {
  attributes: {
    id: 'string',
    imageUri: 'string',
    name: 'string'
  },
  beforeCreate: updateImage,
  beforeUpdate: updateImage,
  afterCreate: indexInstance,
  afterUpdate: indexInstance,
  afterDestroy: function (results, next) {
    console.log('documentid:', results[0].id);
    ElasticSearchService.removeDocument(results[0]);
    next();
  }
};

