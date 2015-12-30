rscApp.controller('LoginController', ['$scope', 'RemoteSocketService', '$window', '$location', '$rootScope', function ($scope, RemoteSocketService, $window, $location, $rootScope){

    $scope.loginFailed = false;
    $scope.errorMessage = '';

    this.login = function(){

        $scope.loginFailed = false;

        // check if user entered username and password
        if (!$scope.username || !$scope.password){
            $scope.loginFailed = true;
            $scope.errorMessage = 'Please enter a username and a password!';
            return;
        }

        RemoteSocketService.connect($scope.username, $scope.password).then(function(){

            // save credentials to sessionStorage
            $window.sessionStorage.setItem('username', $scope.username);
            $window.sessionStorage.setItem('password', $scope.password);

            // broadcast event for interested controllers
            $rootScope.$broadcast('login');

            //redirect
            $location.path('/');

        }, function (reason){
            $scope.loginFailed = true;
            $scope.errorMessage = reason;
        });

    };

}]);