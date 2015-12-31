rscApp.controller('SocketController', ['$scope', 'RemoteSocketService', '$rootScope', function($scope, RemoteSocketService, $rootScope){

    $scope.successOn = false;
    $scope.successOff = false;

    $scope.errorOn = false;
    $scope.errorOff = false;

    this.switchOn = function(){
        $scope.successOn = false;
        $scope.errorOn = false;
        RemoteSocketService.send($scope.groupIndex, $scope.$index, 'ON');
    };

    this.switchOff = function(){
        $scope.successOff = false;
        $scope.errorOn = false;
        RemoteSocketService.send($scope.groupIndex, $scope.$index, 'OFF');
    };

    $rootScope.$on('response', function(ev, data){

        if(data.group === $scope.groupIndex && data.socket === $scope.$index){

            $scope.successOn = (data.result === 'OK' && data.state === 'ON');
            $scope.successOff = (data.result === 'OK' && data.state === 'OFF');

            $scope.errorOn = (data.result === 'ERR' && data.state === 'ON');
            $scope.errorOff = (data.result === 'ERR' && data.state === 'OFF');

            $scope.$apply();
        }

    });

}]);