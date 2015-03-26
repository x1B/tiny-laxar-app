/**
 * Copyright 2015 aixigo AG
 */
define( [
   'angular',
   'laxar_patterns'
], function( ng, patterns ) {
   'use strict';

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   Controller.$inject = [ '$scope' ];

   function Controller( $scope ) {
      $scope.resources = {};
      patterns.resources.handlerFor( $scope ).registerResourceFromFeature( 'clock' );
   }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////

   return ng.module(  'simpleWidget', [] ).controller( 'SimpleWidgetController', Controller );

} );
