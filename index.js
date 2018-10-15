'use strict';

exports.join = function join() {
  var args = [].slice.apply(arguments);
  var basePath = args.shift().replace(/\/+$/, '');
  var pathSegments = args.map(function(segment) {
    return segment.replace(/(?:^\/+|\/+$)/g, '');
  });
  return [basePath]
    .concat(pathSegments)
    .join('/')
    .replace(/\/+/g, '/');
};

exports.resolve = function resolve() {
  var args = [].slice.apply(arguments);
  var root = /^\.+/.test(args[0]) ? [args[0].replace(/^(\.+).*$/, '$1')] : [];
  return root
    .concat(
      args
        .map(function(segment) {
          return segment.replace(/\/+$/, '');
        })
        .reduce(function(result, segment) {
          if (/^\//.test(segment)) {
            root.splice(0, root.length, '');
            return segment.replace(/^\//, '').split('/');
          }
          while (/^\.\.\//.test(segment)) {
            segment = segment.replace(/^\.\.\//, '');
            result.pop();
          }
          return result.concat(segment.replace(/\.\//g, '').split('/'));
        }, [])
    )
    .join('/')
    .replace(/\/+/g, '/');
};

exports.cleanSlashes = function cleanSlashes(path) {
  return path.replace(/\/+/g, '/');
};

exports.trimSlashes = function trimSlashes(path) {
  return path.replace(/(?:^\/+|\/+$)/g, '');
};

exports.trimLeadingSlashes = function trimLeadingSlashes(path) {
  return path.replace(/^\/+/, '');
};

exports.trimTrailingSlashes = function trimTrailingSlashes(path) {
  return path.replace(/\/+$/, '');
};
