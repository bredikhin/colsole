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

// Hook to assert the output
function stdHook(originalWrite, stream, method) {
  return function() {
    if (arguments[0].indexOf(bait) === -1)
      originalWrite.apply(stream, arguments);
    else
      arguments[0].replace(/\n$/, '').should.be.eql(chalk[config[method]](bait));

    return originalWrite;
  }
}

describe('Colsole', function() {
  // Original `write` functions
  var _outWrite;
  var _errWrite;

  before(function(done) {
    // Save the original `writes`
    _outWrite = process.stdout.write;
    _errWrite = process.stderr.write;

    done();
  });

  after(function(done) {
    // Restore the original `writes`
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
      // Attaching the hooks that contain assertions
      process.stdout.write = stdHook(_outWrite, process.stdout, method);
      process.stderr.write = stdHook(_errWrite, process.stderr, method);

      console[method](bait);

      done();
    });
  });

  it('is configurable', function(done) {
    config['error'] = 'black';
    console = new Colsole(config);

    // Attaching the hook that contains assertion
    process.stderr.write = stdHook(_errWrite, process.stderr, 'error');

    console.error(bait);

    done();
  });
});
