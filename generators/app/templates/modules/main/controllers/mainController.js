'use strict';

angular.module('<%= name %>')
  .controller('MainController', ['$scope', <% if (uiframework === 'angular ui bootstrap') { %>'$uibModal',<% } %> function($scope, <% if (uiframework === 'angular ui bootstrap') { %> $uibModal <% } %> ) {
    //corrigir esse controller ai...se a pessoa escolher angular materila, ele carrega o uibmodal do bootstrap, e da crash...ou seja, o uibmodal so deveria ser carregado se o projeto foir bootstrap
  init();
	function init(){
    console.log("controller main log");



    <% if (uiframework === 'angular ui bootstrap') { %>
      console.log("ui boot ctrl");

      $scope.items = ['item1', 'item2', 'item3'];

      $scope.animationsEnabled = true;

      $scope.open = function (size) {

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              return $scope.items;
            }
          }
        });
      };

    <% } else if (uiframework === 'angular material') { %>
      console.log("material cntrl");
      $scope.data = {
        selectedIndex: 0,
        secondLocked:  true,
        secondLabel:   "Clientside menu Two",
        bottom:        false
      };
      $scope.next = function() {
        $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
      };
      $scope.previous = function() {
        $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
      };



    <% } else { %>
      console.log("so angular");

    <% } %>

	};
}]);

<% if (uiframework === 'angular ui bootstrap') { %>
angular.module('<%= name %>').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
<% } %>
