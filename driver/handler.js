'use strict';

// const { io } = require('socket.io-client');
// const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';

// const { emitter, eventPool } = require('./../eventPool');
// const { payload } = require('../vendor/handler');

// let capsSocket = io(SERVER_URL + '/caps');

// capsSocket.emit('join-group', payload);
// console.log(eventPool);

// capsSocket.on(eventPool[0], (payload) =>{

//   capsSocket.emit('join-group', payload);
//   // console.log('caps socket on')

//   console.log(`DRIVER: picked up ${payload['orderId']}`)
//   capsSocket.emit(eventPool[1], payload);

//   console.log(`${payload.orderId} in transit`);
//   capsSocket.emit(eventPool[2], payload);

// });

module.exports = {
  joinRoom: function(socket, payload, roomName) {
    socket.emit(roomName, payload);
    console.log('caps socket on')
  },
  handlePickUp: function(socket, payload) {
      socket.emit('in-transit', payload);
      console.log(`DRIVER: picked up ${payload['orderId']}`)
      socket.emit('delivered', payload);
      console.log(`${payload.orderId} in transit`);
  }

}