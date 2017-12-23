'use strict';

/**
 * @file
 *
 * Copyright 2017 FutoIn Project (https://futoin.org)
 * Copyright 2017 Andrey Galkin <andrey@futoin.org>
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

const request = require( 'request' );
const $as = require( 'futoin-asyncsteps' );

const wrap_request = ( target ) => {
    return ( as, opts, req_cb ) => {
        $as.assertAS( as );

        as.add( ( as ) => {
            const r = target( opts, ( err, rsp, body ) => {
                if ( as.state ) {
                    if ( err || ( rsp.statusCode !== 200 ) ) {
                        as.state.last_exception = err;
                        as.state.last_response = rsp;

                        try {
                            as.error( 'RequestError', 'See as.state.last_exception / as.state.last_response' );
                        } catch ( _ ) {
                            // pass
                        }
                    } else {
                        as.success( rsp, body );
                    }
                }
            } );

            as.setCancel( ( as ) => {
                try {
                    r.abort();
                } catch ( _ ) {
                    // pass
                }
            } );

            if ( req_cb ) {
                req_cb( r );
            }
        } );
    };
};

const futoin_request = wrap_request( request );

for ( let m of [ 'get', 'post', 'put', 'patch', 'del', 'head', 'options' ] ) {
    futoin_request[m] = wrap_request( request[m] );
}

futoin_request.defaults = ( ...args ) => request.defaults( ...args );
futoin_request.cookie = ( ...args ) => request.cookie( ...args );
futoin_request.jar = ( ...args ) => request.jar( ...args );

module.exports = futoin_request;
