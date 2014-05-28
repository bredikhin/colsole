# Yet another colored console

[![Build Status](https://travis-ci.org/bredikhin/colsole.png?branch=master)](https://travis-ci.org/bredikhin/colsole)
[![NPM version](https://badge.fury.io/js/colsole.png)](http://badge.fury.io/js/colsole)

## Installation

`sudo npm install --save colsole`

[![NPM](https://nodei.co/npm/colsole.png)](https://nodei.co/npm/colsole/)

## Usage

```javascript
var console = require('colsole')();

console.log('I will be in white.');
console.info('And I will be in green.');
console.warn('Yellow is good enough for me...');
console.error('And for me it is red-only!');
```

## Dependencies

- [chalk](https://www.npmjs.org/package/chalk),
- [lodash](https://www.npmjs.org/package/lodash).

## Contributions

* are welcome;
* should be tested;
* should follow the same coding style.

Keep it simple, minimum bells and whistles, please.

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 [Ruslan Bredikhin](http://www.ruslanbredikhin.com/)
