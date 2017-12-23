/**
 * @file Browser-specific entry point
 * @author Andrey Galkin <andrey@futoin.org>
 *
 *
 * Copyright 2014-2017 FutoIn Project (https://futoin.org)
 * Copyright 2014-2017 Andrey Galkin <andrey@futoin.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

( function( window ) {
    'use strict';

    var futoin = window.FutoIn || {};

    if ( typeof futoin.request === 'undefined' )
    {
        var $as_request = require( '../index.js' );

        /**
         * **window.FutoIn.request** - browser-only reference to futoin-request module
         * @global
         * @name window.FutoIn.request
         */
        futoin.request = $as_request;

        /**
         * **window.$as_request** - browser-only reference to futoin-request module
         * @global
         * @name window.$as_request
         */
        window.$as_request = $as_request;

        window.FutoIn = futoin;
    }

    if ( typeof module !== 'undefined' ) {
        module.exports = futoin.request;
    }
} )( window );
