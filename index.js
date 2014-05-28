'use strict';

/**
 * Dependencies
 */
var util = require('util');
var _ = require('lodash');
var chalk = require('chalk');
var defaults = require('./defaults');
var methods = Object.keys(defaults);

module.exports = Colsole;

function Colsole(config) {
  if (!(this instanceof Colsole))
    return new Colsole(config);

  this._config = config || {};
  _.defaults(this._config, defaults);
}

_.each(methods, function(method) {
  Colsole.prototype[method] = function() {
    var formatted = util.format.apply(this, arguments);

    console[method](chalk[this._config[method]](formatted));
  };
});
