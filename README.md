# pathifist

[![travis](https://img.shields.io/travis/untool/pathifist/master.svg)](https://travis-ci.org/untool/pathifist)&nbsp;[![npm](https://img.shields.io/npm/v/pathifist.svg)](https://www.npmjs.com/package/pathifist) <br/>

`pathifist` is an extremely simple, rather naïve URL path manipulation library. It is meant to be used in browser and non-browser environments to conveniently deal with URL(-ish) paths.

### Installation

Using [NPM](https://www.npmjs.com/get-npm):

```text
npm install -S pathifist
```

Using [Yarn](https://yarnpkg.com/en/):

```text
yarn add pathifist
```

### API

#### `resolve(path, ...)`

`resolve` is `pathifist`'s most elaborate function: it mimics a browser's path resolution and deals with both absolute (e.g. `/foo`) and relative (e.g. `../`) path segments. It accepts an arbitrary number of path segments as arguments.

```javascript
resolve('foo', '/bar'); // => /bar
resolve('./foo', 'bar///', '../baz'); // => ./foo/baz
```

#### `join(path, ...)`

`join` glues an arbitrary number of arguments together with slashes, replacing multiple consecutive slashes in the process.

```javascript
join('foo', '/bar'); // => foo/bar
join('./foo', 'bar///', '../baz'); // => ./foo/bar/../baz
```

#### `dedupeSlashes(path)`

`dedupeSlashes` removes obsolete consecutive slashes from the path it is being passed.

```javascript
dedupe('//foo//bar//'); // => /foo/bar/
```

#### `trimSlashes(path)` / `trim{Leading,Trailing}Slash(path)`

`trimSlashes` / `trim{Leading,Trailing}Slash` removes single or consecutive leading and/or trailing slashes from the `path` it is being passed. It leaves internal slashes untouched.

```javascript
trimSlashes('/foo/bar/'); // => foo/bar
trimLeadingSlash('/foo/bar/'); // => foo/bar/
trimTrailingSlash('/foo/bar/'); // => /foo/bar
```

#### `ensureSlashes(path)` / `ensure{Leading,Trailing}Slash(path)`

`ensureSlashes` / `ensure{Leading,Trailing}Slash` makes sure there are single or consecutive leading and/or trailing slash in the `path` it is being passed. It leaves internal slash untouched.

```javascript
ensureSlashes('foo/bar'); // => /foo/bar/
ensureLeadingSlash('foo/bar'); // => /foo/bar
ensureTrailingSlash('foo/bar'); // => foo/bar/
```
