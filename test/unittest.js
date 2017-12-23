'use strict';

const isNode = ( typeof window === "undefined" );
const $as = isNode ? module.require( 'futoin-asyncsteps' ) : window.$as;
const $as_request = isNode ? module.require( '../index' ) : window.FutoIn.request;
const expect = isNode ? module.require( 'chai' ).expect : window.chai.expect;

describe( '$as_request', function() {
    it ( 'should make requests', function( done ) {
        this.timeout( 10e3 );
        const as = $as();
        as.add(
            ( as ) => {
                $as_request( as, 'https://httpbin.org/get' );
                as.add( ( as, rsp, body ) => {
                    body = JSON.parse( body );
                    expect( body.url ).to.equal( 'https://httpbin.org/get' );
                } );

                $as_request.post( as, {
                    url: 'https://httpbin.org/post',
                    json: { a: 1, b: 2 },
                } );
                as.add( ( as, rsp, body ) => {
                    expect( body.url ).to.equal( 'https://httpbin.org/post' );
                } );

                if ( typeof window === 'undefined' ) {
                    $as_request.post( as, {
                        url: 'https://httpbin.org/post',
                        headers: { 'content-length': 7 },
                    }, ( req ) => req.end( 'Test123' ) );
                    as.add( ( as, rsp, body ) => {
                        body = JSON.parse( body );
                        expect( body.data ).to.equal( 'Test123' );
                    } );
                }
            },
            ( as, err ) => {
                console.log( `${err}:${as.state.error_info}` );
                console.log( as.state.last_response );
                done( as.state.last_exception || 'fail' );
            }
        );
        as.add( ( as ) => done() );
        as.execute();
    } );

    it ( 'should catch status != 200', function( done ) {
        const as = $as();
        as.add(
            ( as ) => {
                $as_request( as, 'https://httpbin.org/status/201' );
                as.add( ( as, rsp, body ) => {
                    as.error( 'Fail' );
                } );
            },
            ( as, err ) => {
                if ( err === 'RequestError' ) {
                    done();
                } else {
                    console.log( `${err}:${as.state.error_info}` );
                    done( as.state.last_exception || 'fail' );
                }
            }
        );
        as.add( ( as ) => done( 'Fail' ) );
        as.execute();
    } );


    it ( 'should connect error', function( done ) {
        const as = $as();
        as.add(
            ( as ) => {
                $as_request( as, 'https://localhost:12345/xyzaqwergfas' );
                as.add( ( as, rsp, body ) => {
                    as.error( 'Fail' );
                } );
            },
            ( as, err ) => {
                if ( err === 'RequestError' ) {
                    done();
                } else {
                    console.log( `${err}:${as.state.error_info}` );
                    done( as.state.last_exception || 'fail' );
                }
            }
        );
        as.add( ( as ) => done( 'Fail' ) );
        as.execute();
    } );

    it ( 'should cancel requests', function( done ) {
        const as = $as();
        as.add(
            ( as ) => {
                as.setTimeout( 100 );

                $as_request( as, 'https://httpbin.org/delay/30' );
                as.add( ( as, rsp, body ) => {
                    as.error( 'Fail' );
                } );
            },
            ( as, err ) => {
                if ( err === 'Timeout' ) {
                    done();
                } else {
                    console.log( `${err}:${as.state.error_info}` );
                    done( as.state.last_exception || 'fail' );
                }
            }
        );
        as.add( ( as ) => done( 'Fail' ) );
        as.execute();
    } );

    it ( 'should expose misc API', function() {
        expect( $as_request.defaults() ).to.be.ok;
        expect( $as_request.cookie( 'ABC=123' ) ).to.be.ok;
        expect( $as_request.jar() ).to.be.ok;
    } );
} );
