/**
 * ListController.js 
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */



module.exports = {
	search: function(req, res) {
    var searchTerm = req.param('phrase');
    ElasticSearchService.search(searchTerm, function(err, results) {
      var mappedResults = _.map(results, function(result) { return result._source });
      res.send(mappedResults);
    });
  }
};
