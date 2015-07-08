/* jshint node: true */
/* global require, module */

var EmberAddon = require( 'ember-cli/lib/broccoli/ember-addon' );
var packageConfig = require( './package.json' );
var replace = require( 'broccoli-string-replace' );
var env = require( './config/environment' );
var app = new EmberAddon();
var tree;

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// Testing dependencies
if ( 'production' !== app.env ) {
    app.import( app.bowerDirectory + '/sinonjs/sinon.js', {
        type: 'test'
    });

    app.import( app.bowerDirectory + '/sinon-qunit/lib/sinon-qunit.js', {
        type: 'test'
    });
}

tree = replace( app.toTree(), {
    files: [
        'index.html',
        'assets/dummy.js'
    ],
    patterns: [
        {
            match: /REPLACE_META_DESCRIPTION/g,
            replacement: packageConfig[ 'description' ]
        }, {
            match: /REPLACE_META_KEYWORDS/g,
            replacement: packageConfig[ 'keywords' ].join( ', ' ) +
                ', ember, ember cli'
        }, {
            match: /REPLACE_APPLICATION_VERSION/g,
            replacement: packageConfig[ 'version' ]
         }
    ]
});

module.exports = tree;
