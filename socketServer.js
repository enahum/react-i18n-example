/**
 * Created by enahum on 12-10-15.
 */
var SocketServer = require('socket.io'),
    io = null;

module.exports = function(server) {
    if(!io) {
        io = new SocketServer({
            serveClient: true
        });
        if(server) {
            io.listen(server);
        }
        io.on('connection', function(socket) {
            console.log('someone connected');
        });
    }

    return io;
};