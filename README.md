# empty-file-callback

[![NPM version](https://img.shields.io/npm/v/empty-file-callback.svg)](https://www.npmjs.com/package/empty-file-callback)
[![Build Status](https://travis-ci.org/shinnn/empty-file-callback.svg?branch=master)](https://travis-ci.org/shinnn/empty-file-callback)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/empty-file-callback.svg)](https://coveralls.io/r/shinnn/empty-file-callback)
[![Dependency Status](https://david-dm.org/shinnn/empty-file-callback.svg)](https://david-dm.org/shinnn/empty-file-callback)
[![devDependency Status](https://david-dm.org/shinnn/empty-file-callback/dev-status.svg)](https://david-dm.org/shinnn/empty-file-callback#info=devDependencies)

[Callback](http://thenodeway.io/posts/understanding-error-first-callbacks/) style version of [empty-file](https://github.com/shinnn/empty-file)

```javascript
const emptyFileCallback = require('empty-file-callback');
const fs = require('fs');

emptyFileCallback('file/path', err => {
  if (err) {
    throw err;
  }

  fs.readFileSync('file/path', 'utf8'); //=> ''
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install empty-file-callback
```

## API

```javascript
const emptyFileCallback = require('empty-file-callback');
```

### emptyFileCallback(*filePath* [, *options*], *callback*)

*filePath*: `String`  
*options*: `Object` ([`fs.writeFile`][fs-writefile] options except for `encoding`)  
*callback*: `Function`

The API is almost the same as [`fs.writeFile`][fs-writefile]'s, execpt for:

* It only writes `new Buffer(0)` to the file. The data is unchangable.  
* It doesn't support `encoding` option.

## Related project

* [empty-file][empty-file] ([Promises/A+](https://promisesaplus.com/) version)

## License

[The Unlicense](./LICENSE).

[empty-file]: https://github.com/shinnn/empty-file
[fs-writefile]: https://nodejs.org/api/fs.html#fs_fs_writesync_fd_data_position_encoding
