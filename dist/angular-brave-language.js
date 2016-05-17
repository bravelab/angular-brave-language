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
    .directive('languageSelector', function (Language) {
      return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'bower_components/angular-brave-language/src/language/language-selector.tpl.html', // TODO
        scope: true
      };
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
    .factory('Language', function ($http, $log, APP_CONFIG) {

      function getLanguage(key, callback) {

        $http.get(APP_CONFIG.apiRootUrl + '/langs/' + key + '.json').success(function (data) {

          callback(data);

        }).error(function () {

          $log.log('Error');
          callback([]);

        });

      }

      function getLanguages(callback) {

        $http.get(APP_CONFIG.apiRootUrl + '/languages.json').success(function (data) {

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
