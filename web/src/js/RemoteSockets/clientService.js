rscApp.service('ClientService', ['$q', 'ConfigService', function($q, ConfigService){

    var client;
    var clientConnected = false;

    this.isConnected = function(){
        return clientConnected;
    };

    this.setConnected = function (status){
        clientConnected = status;
    };

    this.getClient = function (){

        var clientDef = $q.defer();

        if (!!client) {

            clientDef.resolve(client);

        }else {

            ConfigService.getConfig().then(function (config) {

                client = new Paho.MQTT.Client(config.server.host, Number(config.server.port), "RSC_" + Math.random());

                // set callback handlers
                client.onConnectionLost = function (responseObject) {
                    clientConnected = false;
                };

                clientDef.resolve(client);

            }, function (reason){
                clientDef.reject(reason);
            });

        }

        return clientDef.promise;
    };

}]);