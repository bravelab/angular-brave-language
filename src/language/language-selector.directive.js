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
