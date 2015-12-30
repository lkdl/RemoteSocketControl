rscApp.controller('SocketController', ['$scope', 'RemoteSocketService', '$rootScope', function($scope, RemoteSocketService, $rootScope){

    $scope.successOn = false;
    $scope.successOff = false;

    this.switchOn = function(){
        $scope.successOn = false;
        RemoteSocketService.send($scope.groupIndex, $scope.$index, 'ON');
    };

    this.switchOff = function(){
        $scope.successOff = false;
        RemoteSocketService.send($scope.groupIndex, $scope.$index, 'OFF');
    };

    $rootScope.$on('response', function(ev, data){

        if(data.group === $scope.groupIndex && data.socket === $scope.$index){

            if(data.result === 'OK'){

                $scope.successOn = (data.state === 'ON');
                $scope.successOff = (data.state === 'OFF');

            }else{
                // TODO: error handling with classes like success
            }

            $scope.$apply();
        }

    });

}]);