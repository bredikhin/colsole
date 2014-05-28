'use strict';

/**
 * Dependencies
 */
var should = require('should');
var _ = require('lodash');
var chalk = require('chalk');
var Colsole = require('../');
var defaults = require('../defaults');
var config = _.cloneDeep(defaults);
var console = new Colsole();
var bait = 'Catch me!';

function stdHook(originalWrite, method) {
  return function() {
    if (arguments[0].indexOf(bait) === -1)
      originalWrite.apply(process.stdout, arguments);
    else
      arguments[0].replace(/\n$/, '').should.be.eql(chalk[config[method]](bait));

    return originalWrite;
  }
}

describe('Colsole', function() {
  var _outWrite;
  var _errWrite;

  before(function(done) {
    _outWrite = process.stdout.write;
    _errWrite = process.stderr.write;

    done();
  });

  after(function(done) {
    process.stdout.write = _outWrite;
    process.stderr.write = _errWrite;

    done();
  });

  _.each(Object.keys(defaults), function(method) {
    it('has a `' + method + '` method', function(done) {
      console[method].should.be.a.Function;
    
      done();
    });

    it('outputs the string sent to `' + method + '` properly colored', function(done) {
      process.stdout.write = stdHook(_outWrite, method);
      process.stderr.write = stdHook(_errWrite, method);

      console[method](bait);

      done();
    });
  });

  it('is configurable', function(done) {
    config['error'] = 'black';
    console = new Colsole(config);
    process.stderr.write = stdHook(_errWrite, 'error');

    console.error(bait);

    done();
  });
});
