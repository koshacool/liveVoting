const _ = require('lodash');
const socketIo = require('socket.io');
const socketioJwt = require('socketio-jwt');

/**
 * Provide socket message sending for users
 *
 * @example
 *    socketIO.sendFor(userId, 'new-mesage', { message });
 *
 * **/

class SocketIO {
  constructor() {
    this._clients_hash = {};
    this._sockets = {};
  }

  init(server) {
    const io = socketIo(server);

    io.on('connection', client => {
      client.on('disconnect', () => { // remove sockets after disconnect
        delete this._sockets[this._clients_hash[client.id]];
        delete this._clients_hash[client.id];
      });
    });

    io.sockets
      .on('connection', socketioJwt.authorize({
        secret: process.env.SECRET_TOKEN,
        timeout: 15000,
      }))
      .on('authenticated', socket => {
        const userId = _.get(socket, 'decoded_token.id');
        if (userId) {
          this._clients_hash[socket.id] = userId;
          this._sockets[userId] = socket;
        }
      });
  }

  remove(userId){
    delete this._sockets[userId];
    delete this._clients_hash[this._clients_hash[userId]];
  }

  /**
   * Emit new socket event for certain user
   *
   * @params
   *    {String} - userId
   *    {String} - name of emmit method
   *    {Any} - params to send for client
   * **/
  emitFor(userId, name, params) {
    if (this._sockets[userId]) {
      this._sockets[userId].emit(name, params);
    }
  }

  /**
   * Emit new socket event for all expect passed user id
   *
   * @params
   *    {String} - userId
   *    {String} - name of emmit method
   *    {Any} - params to send for client
   * **/
  emitNotFor(userId, name, params) {
    Object.keys(this._sockets).forEach(id => {
      if (id !== userId) {
        return this._sockets[id].emit(name, params);
      }
     });
  }

  /**
   * Emit new socket event for all registered users
   *
   * @params
   *    {String} - name of emmit method
   *    {Any} - params to send for client
   * **/
  emitAll(name, params) {
    Object.values(this._sockets).forEach(socket => {
      return socket.emit(name, params)
    });
  }

  /**
   * Return all connected users
   *
   * @return
   *    [String] - userId
   * **/
  getConnected() {
    return _.keys(this._sockets);
  }
}

const socketIO = new SocketIO();

module.exports = { socketIO };
