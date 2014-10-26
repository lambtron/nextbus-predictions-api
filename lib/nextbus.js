
var request = require('request');
var _ = require('underscore');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var thunkify = require('thunkify');
var co = require('co');
var domain = 'http://webservices.nextbus.com';
var agency = 'sf-muni';


/**
 * getPrediction
 * @param  {string}   a       agency, i.e. 'muni'
 * @param  {string}   r       route
 * @param  {string}   stopTag stopTag
 */
function* _getPrediction(a, r, stopTag) {
  var get = thunkify(request.get);
  var parse = thunkify(parser.parseString);
  var path = '/service/publicXMLFeed'
           + '?command=predictions'
           + '&a=' + a
           + '&r=' + r
           + '&s=' + stopTag
           + '&useShortTitles=true';
  var xml = yield get(domain + path);
  var json = yield parse(xml[0].body);
  return json;
}

/**
 * getAllPredictions
 *
 */
module.exports.getAllPredictions = function *getAllPredictions() {
  if ('POST' != this.method) return yield next;
  var stops = this.request.body.stops || [];

  if (stops.length == 0) {
    this.body = 'Did not include stops in request';
    return;
  }

  var predictions = [];
  for (var i = 0; i < stops.length; i++) {
    var stuff = yield _getPrediction(agency, stops[i].route, stops[i].stopTag);
    predictions.push(stuff);
  }

  // format.
  var formatted = [];
  predictions.forEach(function(p) {
    var results = p.body.predictions[0].direction[0].prediction;
    var stopTitle = p.body.predictions[0].$.stopTitle;
    var routeTitle = p.body.predictions[0].$.routeTitle;
    var times = results.map(function(result) {
      return {
        timeUntilArrival: Number(result.$.minutes),
        stopTitle: stopTitle,
        routeTitle: routeTitle
      };
    });
    formatted.push(times)
  });

  this.body = JSON.stringify(formatted, null, 2);
};
