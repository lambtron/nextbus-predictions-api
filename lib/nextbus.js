
var request = require('superagent');
var Batch = require('batch');
var batch = new Batch;
var _ = require('underscore');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var domain = 'webservices.nextbus.com';
var agency = 'sf-muni';


/**
 * get
 * @param  {string}   path the URI to GET
 * @param  {Function} cb   callback
 */
function _get(path, cb) {
  request
    .get(domain + path)
    .end(function(res) {
      parser.parseString(res.text, cb);
    });
}


/**
 * getPrediction
 * @param  {string}   a       agency, i.e. 'muni'
 * @param  {string}   r       route
 * @param  {string}   stopTag stopTag
 * @param  {Function} cb      callback
 */
function _getPrediction(a, r, stopTag, cb) {
  var path = '/service/publicXMLFeed'
           + '?command=predictions'
           + '&a=' + a
           + '&r=' + r
           + '&s=' + stopTag
           + '&useShortTitles=true';

  _get(path, function(err, result) {
    if (err)
      cb(err, null);

    if (result.body.predictions[0].direction) {
      var results = result.body.predictions[0].direction[0].prediction;
      var stopTitle = result.body.predictions[0].$.stopTitle;
      var routeTitle = result.body.predictions[0].$.routeTitle;
      var predictions = results.map(function(prediction) {
        return {
          timeUntilArrival: Number(prediction.$.minutes),
          stopTitle: stopTitle,
          routeTitle: routeTitle
        };
      });

      cb(null, predictions);
    }
  });
}


/**
 * getAllPredictions
 * @param  {array}    stops array of objects: route, stopTag
 * @param  {function} cb    callback
 */
module.exports.getAllPredictions = function getAllPredictions(stops, cb) {
  var allPredictions = [];
  batch.concurrency(stops.length);

  stops.forEach(function(stop) {
    batch.push(function(done) {
      _getPrediction(agency, stop.route, stop.stopTag, function(err, data) {
        if (err)
          cb(err, null);

        allPredictions.push(data);
        done();
      });
    });
  });

  batch.end(function(err, data) {
    if (err)
      cb(err, null);

    _.sortBy(_.compact(_.flatten(allPredictions)), 'timeUntilArrival')
    cb(null, allPredictions);
  });
};
