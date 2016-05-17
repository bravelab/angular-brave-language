(function () {
  'use strict';

  angular
    .module('ngBraveLanguage')
    .controller('LanguagesCtrl', function LanguagesCtrl($scope, $rootScope, $log, Language) {

      $rootScope.lang = {};

      Language.getLanguages(function (response) {
        $rootScope.currentLanguage = response[0];
        $rootScope.languages = response;
        Language.getLang(response[0].key, function (data) {
          $rootScope.lang = data;
        });

      });

      $scope.selectLanguage = function (language) {
        $rootScope.currentLanguage = language;

        Language.getLang(language.key, function (data) {
          $rootScope.lang = data;
        });
      };

      $rootScope.getWord = function (key) {
        if (angular.isDefined($rootScope.lang[key])) {
          return $rootScope.lang[key];
        } else {
          return key;
        }
      };
    });

}());
