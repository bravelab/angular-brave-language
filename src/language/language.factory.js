(function () {
  'use strict';

  angular
    .module('ngBraveLanguage')
    .factory('Language', function ($http, $log, languageConfig) {

      function getLanguage(key, callback) {
        $http.get(languageConfig.apiUrl + '/languages/' + key).success(function (data) {
          callback(data);
        }).error(function () {
          $log.log('Error');
          callback([]);
        });
      }

      function getLanguages(callback) {
        $http.get(languageConfig.apiUrl + '/languages').success(function (data) {
          callback(data);
        }).error(function () {
          $log.log('Error');
          callback([]);
        });
      }

      return {
        getLang: function (type, callback) {
          getLanguage(type, callback);
        },
        getLanguages: function (callback) {
          getLanguages(callback);
        }
      };

    });

}());
