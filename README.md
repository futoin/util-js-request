
  [![NPM Version](https://img.shields.io/npm/v/futoin-request.svg?style=flat)](https://www.npmjs.com/package/futoin-request)
  [![NPM Downloads](https://img.shields.io/npm/dm/futoin-request.svg?style=flat)](https://www.npmjs.com/package/futoin-request)
  [![Build Status](https://travis-ci.org/futoin/util-js-request.svg)](https://travis-ci.org/futoin/util-js-request)
  [![stable](https://img.shields.io/badge/stability-stable-green.svg?style=flat)](https://www.npmjs.com/package/futoin-request)

  [![NPM](https://nodei.co/npm/futoin-request.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/futoin-request/)

# About

[FutoIn AsyncSteps](https://www.npmjs.com/package/futoin-asyncsteps) friendly wrapper of [request](https://www.npmjs.com/package/request).

**Documentation** --> [FutoIn Guide](https://futoin.org/docs/miscjs/asyncsteps-request/)

Author: [Andrey Galkin](mailto:andrey@futoin.org)

# Installation for Node.js

Command line:
```sh
$ npm install futoin-request --save
```
or:

```sh
$ yarn add futoin-request --save
```

# Browser installation

The module can be used with `webpack` or any other CommonJS packer. However, please
ensure to use ES6->ES5 transpilation for older browsers.

Pre-packed UMD module is available in dist/futoin-request.js (stripped ~180KB from over 1MB).

Note: please note that pre-packed dist is heavily stripped of dependencies and most features
of request library is not expected to work due not minimal use case in browsers:
* MIME type detection based on upload file name
* AWS request signing feature
* HAR feature
* HTTP Signature feature
* HAWK feature
* Proxy/Tunnel feature
* HTTP digest auth (large crypto dependency)
* OAuth
* tough-cookie

You can always use own webpack build.

# Examples

```javascript
const $as = require('futoin-asyncsteps');
const $as_request = require('futoin-request');

$as().add((as) => {
    // Very basic
    $as_request(as, 'https://httpbin.org/get');
    as.add((as, rsp, body) => console.log(body));
    
    // As usual
    $as_request.post(as, {
        url: 'https://httpbin.org/post',
        json: {a: 1, b: 2},
    });
    as.add((as, rsp, body) => console.log(body));
    
    // With callback for request as stream manipulation
    $as_request.post(as, {
        url: 'https://httpbin.org/post',
        headers: { 'content-length': 4 },
    }, (req) => req.end('test') );
    as.add((as, rsp, body) => console.log(body));    
}).execute();

```
    
# API documentation

API is absolutely the same as for original request package except that:

1. The first parameter must be a reference of AsyncSteps interface type.
2. A next step receiving `(as, rsp, body) => {}` must be added instead of result callback.
3. Error is thrown through `AsyncSteps#error()`, if detected.
4. HTTP status != 200 is error as well.
5. Request object is not returned, but passed to optional callback (third argument).

Additional notes:
* Request is properly canceled on `AsyncSteps#cancel()` or timeout
* Error info details
    - error type - `RequestError`
    - error object should be available through standard `as.state.last_exception` convention
    - `as.state.last_response` is set with response object
* Browser provides `$as_request` global reference

## Members

<dl>
<dt><a href="#request">request</a></dt>
<dd><p><strong>window.FutoIn.request</strong> - browser-only reference to futoin-request module</p>
</dd>
<dt><a href="#$as_request">$as_request</a></dt>
<dd><p><strong>window.$as_request</strong> - browser-only reference to futoin-request module</p>
</dd>
</dl>

<a name="request"></a>

## request
**window.FutoIn.request** - browser-only reference to futoin-request module

**Kind**: global variable  
<a name="$as_request"></a>

## $as\_request
**window.$as_request** - browser-only reference to futoin-request module

**Kind**: global variable  

