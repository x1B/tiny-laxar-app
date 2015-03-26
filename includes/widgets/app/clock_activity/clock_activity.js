/**
 * Copyright 2015 aixigo AG
 */
define( [
   'angular'
], function( ng ) {
   'use strict';

   Controller.$inject = [ '$scope', '$interval', 'axEventBus' ];

   function Controller( $scope, $interval, eventBus ) {
      var interval;

      eventBus.subscribe( 'beginLifecycleRequest', function() {
         tick();
         interval = $interval( tick, 1000 );
      } );

      eventBus.subscribe( 'endLifecycleRequest', function() {
         $interval.cancel( interval );
      } );

      ////////////////////////////////////////////////////////////////////////////////////////////////////////

      function tick() {
         eventBus.publish( 'didReplace.' + $scope.features.clock.resource, {
            resource: $scope.features.clock.resource,
            data: {
               time: ''+new Date()
            }
         } );
      }
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module(  'clockActivity', [] ).controller( 'ClockActivityController', Controller );

} );
