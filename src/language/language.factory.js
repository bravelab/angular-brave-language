(function () {
  'use strict';

  angular
    .module('ngBraveLanguage')
    .factory('Language', function ($http, $log, languageConfig) {

      function getLanguages(callback) {
        $http.get(languageConfig.apiUrl + '/languages').success(function (data) {
          callback(data);
        }).error(function () {
          $log.log('Error');
          callback([]);
        });
      }

      return {
        getLanguages: function (callback) {
          getLanguages(callback);
        }
      };

    });

}());
