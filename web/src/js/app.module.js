var rscApp = angular.module('RemoteSocketControl', ['ngRoute']);

rscApp.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
}]);

