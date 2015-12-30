rscApp.service('ConfigService', ['$q', '$http', function($q, $http){

    var config;

    this.getConfig = function(){

        var c = $q.defer();

        if(!!config){

            c.resolve(config);

        } else {

            $http({
                method: 'GET',
                url: '/config.json'
            }).then(function (response) {
                config = response.data;
                c.resolve(config);
            }, function (response) {
                c.reject('Configuration error: ' + response.statusText);
            });

        }

        return c.promise;

    };

    this.getGroups = function (){

        var groupsDef = $q.defer();

        this.getConfig().then(function (config){
            groupsDef.resolve(config.groups);
        }, function(reason){
            groupsDef.reject(reason);
        });

        return groupsDef.promise;
    };

}]);