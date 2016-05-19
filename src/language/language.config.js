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
