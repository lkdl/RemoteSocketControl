rscApp.controller('HeaderController', ['$scope', '$rootScope', '$location', '$window', 'RemoteSocketService', function ($scope, $rootScope, $location, $window, RemoteSocketService){

    $scope.showLogout = (!!$window.sessionStorage.username && !!$window.sessionStorage.password);

    this.logout = function(){
        $window.sessionStorage.clear();
        RemoteSocketService.disconnect();
        $scope.showLogout = false;
        $location.path('/login');
    };

    $rootScope.$on('login', function (ev){
       $scope.showLogout = true;
    });

}]);