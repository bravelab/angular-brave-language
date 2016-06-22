(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ngBraveLanguage
   * @description ngBraveLanguage tests
   *
   */
  describe('ngBraveLanguage module', function () {

    beforeEach(module('ngBraveLanguage'));

    describe('value - version', function () {
      it('should return current version', inject(function (version) {
        expect(version).toEqual('0.0.2');
      }));
    });

  });
})();

