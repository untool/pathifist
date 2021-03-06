var test = require('ava');

var pathifist = require('./index');

var resolve = pathifist.resolve;
var join = pathifist.join;

var dedupe = pathifist.dedupeSlashes;
var trim = pathifist.trimSlashes;
var ensure = pathifist.ensureSlashes;

var trimLeading = pathifist.trimLeadingSlash;
var trimTrailing = pathifist.trimTrailingSlash;

var ensureLeading = pathifist.ensureLeadingSlash;
var ensureTrailing = pathifist.ensureTrailingSlash;

test('exports test', function(t) {
  t.is(typeof join, 'function', 'join is a function');
  t.is(typeof resolve, 'function', 'resolve is a function');
  t.is(typeof dedupe, 'function', 'dedupe is a function');
  t.is(typeof trim, 'function', 'trimSlashes is a function');
  t.is(typeof ensure, 'function', 'ensureSlashes is a function');
  t.is(typeof trimLeading, 'function', 'trimLeadingSlash is a function');
  t.is(typeof trimTrailing, 'function', 'trimTrailingSlash is a function');
  t.is(typeof ensureLeading, 'function', 'ensureLeadingSlash is a function');
  t.is(typeof ensureTrailing, 'function', 'ensureTrailingSlash is a function');
});

test('resolve test', function(t) {
  t.is(resolve('foo', 'bar'), 'foo/bar', 'resolving works');
  t.is(resolve('./foo', '../bar'), './bar', 'local resolving works');
  t.is(resolve('../foo', '../bar'), '../bar', 'relative resolving works');
  t.is(resolve('foo/', './bar'), 'foo/bar', 'resolving with dot/slashes works');
  t.is(resolve('foo/', '../bar'), 'bar', 'resolving with dots works');
  t.is(resolve('/foo/', '/bar'), '/bar', 'resolving with slashes works');
  t.is(resolve('/foo/', '../bar'), '/bar', 'resolving with dots/slashes works');
  t.is(resolve('/a/', './b/', '../c'), '/a/c', 'complex resolving works');
});

test('join test', function(t) {
  t.is(join('foo', 'bar'), 'foo/bar', 'joining works');
  t.is(join('./foo', 'bar'), './foo/bar', 'local joining works');
  t.is(join('../foo', 'bar'), '../foo/bar', 'relative joining works');
  t.is(join('/foo/', '/bar'), '/foo/bar', 'joining with slashes works');
  t.is(join('/foo/', '../bar'), '/foo/../bar', 'joining with dots works');
  t.is(join('/a/', './b/', '../c'), '/a/./b/../c', 'complex joining works');
});

test('dedupeSlashes test', function(t) {
  t.is(dedupe('/foo///bar/'), '/foo/bar/', 'dedupe works');
  t.is(dedupe('//foo/bar//'), '/foo/bar/', 'multi dedupe works');
});

test('trimSlashes test', function(t) {
  t.is(trim('/foo/bar/'), 'foo/bar', 'trim works');
  t.is(trim('//foo//bar//'), 'foo//bar', 'multi trim works');
});

test('ensureSlashes test', function(t) {
  t.is(ensure('foo/bar'), '/foo/bar/', 'ensure works');
  t.is(ensure('//foo//bar//'), '/foo//bar/', 'multi ensure works');
});

test('trimLeadingSlash test', function(t) {
  t.is(trimLeading('/foo/bar/'), 'foo/bar/', 'trimLeading works');
  t.is(trimLeading('//foo//bar//'), 'foo//bar//', 'multi trimLeading works');
});

test('trimTrailingSlash test', function(t) {
  t.is(trimTrailing('/foo/bar/'), '/foo/bar', 'trimTrailing works');
  t.is(trimTrailing('//foo//bar//'), '//foo//bar', 'multi trimTrailing works');
});

test('ensureLeadingSlash test', function(t) {
  t.is(ensureLeading('foo/bar'), '/foo/bar', 'ensureLeading works');
  t.is(ensureLeading('//foo//bar'), '/foo//bar', 'multi ensureLeading works');
});

test('ensureTrailingSlash test', function(t) {
  t.is(ensureTrailing('foo/bar'), 'foo/bar/', 'ensureTrailing works');
  t.is(ensureTrailing('foo//bar//'), 'foo//bar/', 'multi ensureTrailing works');
});
