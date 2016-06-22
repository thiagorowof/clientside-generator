'use strict';

angular.module('<%= appName %>')
  .directive('<%= directiveName %>Directive', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the <%= directiveName %> directive');
      }
    };
  });
