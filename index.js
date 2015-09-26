'use strict';

var fs = require('graceful-fs');
var isObj = require('is-obj');

var emptyBuffer = new Buffer(0);

module.exports = function emptyFileCallback(filePath, options, cb) {
  module.exports.validateOptions(options, module.exports.ENCODING_ERROR_MESSAGE);
  fs.writeFile(filePath, emptyBuffer, options, cb);
};

module.exports.validateOptions = function validateEmptyFileCallbackOptions(options, errMessage) {
  if (typeof options === 'string') {
    throw new TypeError(errMessage);
  }

  if (isObj(options) && options.encoding) {
    throw new TypeError(errMessage.replace('string', 'option'));
  }
};

module.exports.ENCODING_ERROR_MESSAGE = 'Encoding string is not supported ' +
                                        'since empty-file-callback writes an empty file.';
