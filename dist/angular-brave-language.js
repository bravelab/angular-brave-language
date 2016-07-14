(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveLanguage]
   * @description Show http errors by angular-language
   */
  angular
    .module('ngBraveLanguage', [])
    .value('version', '0.0.8');

})();

(function () {
  'use strict';

  angular
    .module('ngBraveLanguage')
    .directive('languageSelector', function (languageConfig) {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: function() {
          return languageConfig.templates.directives.languageSelector;
        },
        scope: true
      };
    });

}());

(function() {
  'use strict';

  angular
    .module('ngBraveLanguage')
    .constant('languageConfig', {
      apiUrl: '/api',
      templates: {
        directives: {
          languageSelector: 'bower_components/angular-brave-language/src/language/language-selector.tpl.html'
        }
      }
    });

}());

(function () {
  'use strict';

  angular
    .module('ngBraveLanguage')
    .controller('LanguagesCtrl', function LanguagesCtrl($scope, $translate, $rootScope, $sessionStorage, $log, $state, Language, appConfig, toastr) {
      $rootScope.lang = {};

      function transformResponse(response) {
        return response.data;
      }

      Language.getLanguages(function (response) {
        var data = transformResponse(response);

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
