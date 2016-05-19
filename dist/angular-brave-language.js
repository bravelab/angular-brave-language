(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveLanguage]
   * @description Show http errors by angular-language
   */
  angular
    .module('ngBraveLanguage', [])
    .value('version', '0.0.1');

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
