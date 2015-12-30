rscApp.service('RemoteSocketService', ['$q', 'ClientService', '$window', '$rootScope', function($q, ClientService, $window, $rootScope) {

    this.connect = function (username, password){

        var connectDef = $q.defer();

        if (ClientService.isConnected()){

            connectDef.resolve();

        }else{

            ClientService.getClient().then(function(client){

                client.onMessageArrived = function(message){

                    var m = message.destinationName.match(/\/home\/socket\/response\/group(\d+)\/socket(\d+)/);
                    var st = message.payloadString.match(/(OK|ERR) (ON|OFF)(\s\d+){0,1}/);

                    if(m.length === 3 && st.length >= 2){

                        $rootScope.$broadcast('response', {
                            group: parseInt(m[1]),
                            socket: parseInt(m[2]),
                            state: st[2],
                            result: st[1]
                        });

                    }

                };

                // establish a connection to the server
                client.connect({
                    onSuccess: onConnect,
                    onFailure: onFailure,
                    userName: username,
                    password: password
                });


                // called when the client connects
                function onConnect() {
                    client.subscribe("/home/socket/response/#");
                    connectDef.resolve();
                    ClientService.setConnected(true);
                }

                function onFailure(data) {

                    var errorMessage = data.errorMessage;

                    // make some error messages a bit more specific
                    if(data.errorCode === 8){
                        errorMessage = 'Incorrect username and/or password!';
                    } else if (data.errorCode === 7){
                        errorMessage = 'Server not found or not responding properly!';
                    }

                    connectDef.reject(errorMessage);

                }

            }, function (reason){
                connectDef.reject(reason);
            });

        }


        return connectDef.promise;
    };

    // autologin
    if($window.sessionStorage.username && $window.sessionStorage){
        this.connect($window.sessionStorage.username, $window.sessionStorage.password).then(function (){
            console.log('Autologin with saved credentials');
        }, function (reason){
            alert('An error occured while trying to automatically log in: '+reason);
        });
    }

    this.disconnect = function (){

        if(ClientService.isConnected()){
            ClientService.getClient().then(function(client){
                client.disconnect();
            });
        }

        ClientService.setConnected(false);
    };

    this.send = function (group, socket, state){

        var message = new Paho.MQTT.Message(state);
        message.destinationName = '/home/sockets/group'+group+'/socket'+socket;

        ClientService.getClient().then(function(client){
            client.send(message);
        }, function (reason){
            alert('Could not send: '+reason);
        });

    };

}]);