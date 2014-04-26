var AWS = require('aws-sdk');
var dataUriToBuffer = require('data-uri-to-buffer');
var bucket = 'rewards-site-photos';
var s3 = new AWS.S3({params: {Bucket: bucket}});

var generateRandomKey = function() {
  return Math.random().toString(36).substring(10);
};

module.exports = {
  uploadDataUri: function(dataUri, onSuccess) {
    var key = generateRandomKey() + '-image.jpg';
    var data = {
      Key: key, // required
      Body: dataUriToBuffer(dataUri),
      ACL: 'public-read'
    };
    s3.putObject(data, function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        var imageLocation = 'http://'+ bucket +'.s3.amazonaws.com/' + key;
        onSuccess(imageLocation);
      }
    });
  }
};
