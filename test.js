'use strong';

const emptyFileCallback = require('.');
const pify = require('pify');
const test = require('tape');

const {
  readFile: readFilePromise,
  stat: statPromise,
  unlink: unlinkPromise
} = pify.all(require('graceful-fs'));

test('emptyFileCallback()', t => {
  t.plan(10);

  t.equal(emptyFileCallback.name, 'emptyFileCallback', 'should have a function name.');

  emptyFileCallback('tmp0', err => {
    t.strictEqual(err, null, 'should not throw any errors when it writes a file correctly.');

    readFilePromise('tmp0', 'utf8').then(content => {
      t.strictEqual(content, '', 'should write an empty file.');

      unlinkPromise('tmp0').catch(t.fail);
    }).catch(t.fail);
  });

  emptyFileCallback('tmp1', {mode: 33261}, err => {
    t.strictEqual(err, null, 'should accept fs.writeFile options');

    statPromise('tmp1').then(stats => {
      t.strictEqual(
        stats.mode,
        33261,
        'should support fs.writeFile options.'
      );
    }).catch(t.fail);

    unlinkPromise('tmp1').catch(t.fail);
  });

  emptyFileCallback('node_modules', null, err => {
    t.ok(err, 'should pass an error to the callback when it fails to write a file.');
  });

  t.throws(
    () => emptyFileCallback('___', 'utf8', t.fail),
    /TypeError.*Encoding string is not supported since empty-file-callback writes an empty file\./,
    'should not accept encoding string.'
  );

  t.throws(
    () => emptyFileCallback('___', {encoding: 'base64'}, t.fail),
    /TypeError.*Encoding option is not supported since empty-file-callback writes an empty file\./,
    'should not accept encoding option.'
  );

  t.throws(
    () => emptyFileCallback(null, t.fail),
    /TypeError.*path/,
    'should throw a type error when the first argument is not a string.'
  );

  t.throws(
    () => emptyFileCallback('foo', 123, t.fail),
    /TypeError.*Expected options to be either an object or a string/,
    'should throw a type error when the second argument is neither an object nor a string.'
  );
});
