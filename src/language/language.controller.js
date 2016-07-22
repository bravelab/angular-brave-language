(function () {
  'use strict';

  angular
    .module('ngBraveLanguage')
    .controller('LanguagesCtrl', function LanguagesCtrl($scope, $translate, $rootScope, $sessionStorage, $log, $state, Language, appConfig, toastr) {
      $rootScope.lang = {};
      $rootScope.availableLanguages = [];

      function transformResponse(response) {
        return response.data;
      }

      function findAvailableLanguages(languages) {
        angular.forEach(languages, function (obj) {
          if (_.indexOf($translate.getAvailableLanguageKeys(), obj.key) !== -1) {
            $rootScope.availableLanguages.push(obj);
          }
        });
      }

      Language.getLanguages(function (response) {
        var data = transformResponse(response);

        findAvailableLanguages(data);

        if (angular.isUndefined($sessionStorage.currentLanguage)) {
          angular.forEach(data, function (obj) {
            if (obj.key === $translate.use()) {
              $rootScope.currentLanguage = obj;
            }
          });
        } else {
          $rootScope.currentLanguage = $sessionStorage.currentLanguage;
        }

        $rootScope.languages = data;

      });

      $scope.selectLanguage = function (language) {
        var avaliable = false;

        // Check if chosen translation is avaliable
        angular.forEach(appConfig.i18n.availableLanguageKeys, function (value, key) {
          value === language.key ? avaliable = true : null;
        });

        if (avaliable) {
          $sessionStorage.currentLanguage = language;
          window.location.reload(true);
        } else {
          toastr.warning('Translation not avaliable!');
        }
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
