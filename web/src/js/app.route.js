rscApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {

        // Authentication function
        var checkAuth = function ($location, $q, $window) {
            var deferred = $q.defer();
            if (!$window.sessionStorage.username || !$window.sessionStorage.password) {
                deferred.reject();
                $location.path('/login');
            } else {
                deferred.resolve();
            }
            return deferred.promise;
        };

        checkAuth.$inject = ['$location', '$q', '$window'];

        // Routes
        $routeProvider.
        when('/', {
            templateUrl: '/partials/sockets.html',
            resolve: {checkAuth: checkAuth}
        }).
        when('/login', {
            templateUrl: '/partials/login.html'
        }).
        otherwise({
            redirectTo: '/'
        });

        //$locationProvider.html5Mode(true);
    }]);