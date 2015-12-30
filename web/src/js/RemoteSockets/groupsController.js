rscApp.controller('GroupsController', ['$scope', 'ConfigService', function($scope, ConfigService){

    $scope.groups = [];

    ConfigService.getGroups().then(function (groups){
        $scope.groups = groups;
    },
    function (reason){
        alert('Getting groups failed: '+reason);
    });

}]);