var ElasticClient = require('elasticsearchclient');
var client = new ElasticClient(require('../../config/connections').connections.elasticSearch);
var index = 'app';
var type = 'list';

module.exports = {
  index: function(document) {
    client.index(index, type, document, document.id)
      .on('data', function(data) {
        console.log('indexed:', data);
      })
      .on('error', function(err) {})
      .exec();
  },
  removeDocument: function(document) {
    client.deleteDocument(index, type, document.id, function(error, data) {
      if (error) {
        console.error('failed to delete', document.id, error);
      } else {
        console.log('deleted:', data);
      }
    });
  },
  search: function(searchTerm, onSuccess) {
    // Classic Search-Box Style Full-Text Query
    debugger;
    var qryObj = {
      'query': {
        'query_string': {
          'query': 'name:' + searchTerm
        }
      }
    };
    client.search(index, type, qryObj, function(err, data) {
      var results = JSON.parse(data).hits;
      if (results) {
        onSuccess(null, results.hits);
      } else {
        onSuccess(null, []);
      }
    });
  }
};
