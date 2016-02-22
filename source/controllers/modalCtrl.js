"use strict";

angular.module("toWork")

.controller("modalCtrl", function($scope, $state, $uibModalInstance){

 $scope.animationsEnabled = true;

  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'template/modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });

    modalInstance.result.then(function() {

    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

// $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
.controller('ModalInstanceCtrl', function($scope) {
//   $scope.login = false;
//   $scope.register = false;
//   $scope.errors = false;

//   $scope.showError = function(err){
//   	$scope.errors = true;
//     $scope.errorMessages = err;
//   }

//   $scope.showLogin = function() {
//     $scope.login = !$scope.login;
//     $scope.register = false;
//   }

//   $scope.showReg = function() {
//     $scope.register = !$scope.register;
//     $scope.login = false;
//   }

//   $scope.cancel = function() {
//     console.log("cancel clicked")
//     $uibModalInstance.dismiss('cancel');
//   };
// })

})
.directive('taskModal', function(){
  return{
    templateUrl: "templates/task-modal.html"
  }
})
