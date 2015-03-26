var require = {
   baseUrl: 'bower_components',
   deps: [
      // :TODO: Needed to dun spec tests: 'es5-shim/es5-shim',
      'requirejs'
   ],
   shim: {
      angular: {
         deps: [],
         exports: 'angular'
      },
      'angular-mocks': {
         deps: [
            'angular'
         ],
         init: function ( angular ) {
            'use strict';
            return angular.mock;
         }
      },
      'angular-route': {
         deps: [
            'angular'
         ],
         init: function ( angular ) {
            'use strict';
            return angular;
         }
      },
      'angular-sanitize': {
         deps: [
            'angular'
         ],
         init: function ( angular ) {
            'use strict';
            return angular;
         }
      },
      'json-patch': {
         exports: 'jsonpatch'
      }
   },
   packages: [
      {
         name: 'laxar',
         location: '../includes/lib/laxar',
         main: 'laxar'
      },
      {
         name: 'laxar_patterns',
         location: '../includes/lib/laxar_patterns',
         main: 'laxar_patterns'
      }
   ],
   paths: {
      // LaxarJS Core:
      requirejs: 'requirejs/require',
      angular: 'angular/angular',
      'angular-route': 'angular-route/angular-route',
      'angular-sanitize': 'angular-sanitize/angular-sanitize',
      jjv: 'jjv/lib/jjv',
      jjve: 'jjve/jjve',

      // LaxarJS Core Testing:
      jquery: 'jquery/dist/jquery',
      'angular-mocks': 'angular-mocks/angular-mocks',
      jasmine: 'jasmine/lib/jasmine-core/jasmine',
      q_mock: 'q_mock/q',

      // LaxarJS Core Legacy:
      text: 'requirejs-plugins/lib/text',
      json: 'requirejs-plugins/src/json',

      // LaxarJS Patterns:
      'json-patch': 'fast-json-patch/src/json-patch-duplex',

      // App Parts:
      'laxar-path-root': '..',
      'laxar-path-layouts': '../application/layouts',
      'laxar-path-pages': '../application/pages',
      'laxar-path-widgets': '../includes/widgets',
      'laxar-path-themes': '../includes/themes',
      'laxar-path-flow': '../application/flow/flow.json',

      portal_angular_dependencies: '../var/static/portal_angular_dependencies'
   }
};
