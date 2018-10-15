var test = require('ava');
var pathifist = require('./index');

var join = pathifist.join;
var resolve = pathifist.resolve;

var clean = pathifist.cleanSlashes;
var trim = pathifist.trimSlashes;
var trimLeading = pathifist.trimLeadingSlashes;
var trimTrailing = pathifist.trimTrailingSlashes;

test('exports test', function(t) {
  t.is(typeof join, 'function', 'join is a function');
  t.is(typeof resolve, 'function', 'resolve is a function');
  t.is(typeof clean, 'function', 'cleanSlashes is a function');
  t.is(typeof trimLeading, 'function', 'trimLeadingSlashes is a function');
  t.is(typeof trimTrailing, 'function', 'trimTrailingSlashes is a function');
  t.is(typeof trim, 'function', 'trimSlashes is a function');
});

test('join test', function(t) {
  t.is(join('foo', 'bar'), 'foo/bar', 'joining works');
  t.is(join('./foo', 'bar'), './foo/bar', 'local joining works');
  t.is(join('../foo', 'bar'), '../foo/bar', 'relative joining works');
  t.is(join('/foo/', '/bar'), '/foo/bar', 'joining with slashes works');
  t.is(join('/foo/', '../bar'), '/foo/../bar', 'joining with dots works');
  t.is(join('/a/', './b/', '../c'), '/a/./b/../c', 'complex joining works');
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

test('cleanSlashes test', function(t) {
  t.is(clean('/foo//bar///'), '/foo/bar/', 'cS works');
});

test('trimSlashes test', function(t) {
  t.is(trim('/foo/bar/'), 'foo/bar', 'trim works');
  t.is(trim('//foo//bar//'), 'foo//bar', 'multi trim works');
});

test('trimLeadingSlashes test', function(t) {
  t.is(trimLeading('/foo/bar/'), 'foo/bar/', 'trimLeading works');
  t.is(trimLeading('//foo//bar//'), 'foo//bar//', 'multi trimLeading works');
});

test('trimTrailingSlashes test', function(t) {
  t.is(trimTrailing('/foo/bar/'), '/foo/bar', 'trimTrailing works');
  t.is(trimTrailing('//foo//bar//'), '//foo//bar', 'multi trimTrailing works');
});
