# Setting up the web app

## Building

If you don't want to compile the web app yourself, you can just download the latest version from the releases and extract the contents of the `web` folder to your webserver.

Otherwise you'll have to build the app with the following steps:

0. Install `gulp` and `bower` globally.
1. `bower install
2. `npm install``
3. `gulp build`

If everything worked, the app can be found in the `dist` folder. Copy the contents of this folder to your webserver.

## Configuration

The configuration is located in `config.json.dist`. First, you have to copy the file and name the copy `config.json`. Then you'll have to configure the host and the port of the MQTT broker as well as the groups and sockets.

__The groups and sockets in this configuration file have to match your groups from the Arduino configuration!__ The groups are stored as an array, the position of the group is the implicit declaration of the group number. The same applies to the sockets in a group.
