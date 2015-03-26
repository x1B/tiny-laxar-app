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
         interval = $interval( function() {
            eventBus.publish( 'didReplace.' + $scope.features.clock.resource, {
               resource: $scope.features.clock.resource,
               data: {
                  time: ''+new Date()
               }
            } )
         }, 1000 );
      } );

      eventBus.subscribe( 'endLifecycleRequest', function() {
         interval.cancel();
      } );
   }
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module(  'clockActivity', [] ).controller( 'ClockActivityController', Controller );

} );
