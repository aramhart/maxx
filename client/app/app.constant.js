(function(angular, undefined) {
'use strict';

angular.module('maxxApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']})
//constants for Guidebox API Version 2
.constant('guideBoxBaseUrlV2', 'https://api-public.guidebox.com/v2/') 
.constant('v2GuideBoxApiKey', 'api_key=rKXF8DcgHFbOSRgJ3awk3LZlC3tBMXbe')
.constant('omdbBaseUrl', 'http://www.omdbapi.com/')
;
})(angular);