'use strict';

angular.module('maxxApp.auth', [
  'maxxApp.constants',
  'maxxApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
