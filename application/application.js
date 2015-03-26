// See https://github.com/LaxarJS/laxar/blob/master/docs/manuals/configuration.md
window.laxar = ( function() {
   'use strict';

   var modeAttribute = 'data-ax-application-mode';
   var mode = document.querySelector( 'script[' + modeAttribute + ']' ).getAttribute( modeAttribute );

   return {
      name: 'app-without-jquery',
      description: 'My new LaxarJS application',

      portal: {
         theme: 'default',
         useMergedCss: mode === 'RELEASE'
      },

      file_resource_provider: {
         fileListings: {
            'application': 'var/listing/application_resources.json',
            'bower_components': 'var/listing/bower_components_resources.json',
            'includes': 'var/listing/includes_resources.json'
         },
         useEmbedded: mode === 'RELEASE'
      },

      i18n: {
         locales: {
            'default': 'en'
         }
      },

      event_bus: {
         timeout_ms: (mode === 'RELEASE' ? 120 : 10) * 1000
      }

   };

} )();
