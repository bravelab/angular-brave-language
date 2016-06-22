(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveLanguage]
   * @description Show http errors by angular-language
   */
  angular
    .module('ngBraveLanguage', [])
    .value('version', '0.0.2');

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
