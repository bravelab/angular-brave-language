(function () {
  'use strict';

  angular
    .module('ngBraveLanguage')
    .controller('LanguagesCtrl', function LanguagesCtrl($scope, $translate, $rootScope, $sessionStorage, $log, $state, Language) {
      $rootScope.lang = {};

      Language.getLanguages(function (response) {

        if (angular.isUndefined($sessionStorage.currentLanguage)) {
          for (var i=0; i<response.length; i++) {
            if (response[i].key === $translate.use()) {
              $rootScope.currentLanguage = response[i];
            }
          }
        } else {
          $rootScope.currentLanguage = $sessionStorage.currentLanguage;
        }

        Language.getLang(response[0].key, function (data) {
          $rootScope.lang = data;
        });

      });

      $scope.selectLanguage = function (language) {
        $sessionStorage.currentLanguage = language;
        Language.getLang(language.key, function (data) {
          $rootScope.lang = data;
        });
        window.location.reload(true);
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
