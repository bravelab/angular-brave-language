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
