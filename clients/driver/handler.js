'use strict';

const Chance = require('chance');
const chance = new Chance();

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

  handlePickUp: function(socket){
    
    return function(payload){
      socket.emit('join-group', payload);
      socket.emit('getAll', payload);
      console.log(payload);
        
      socket.emit('in-transit', payload);
      console.log(payload);
      console.log(`DRIVER: picked up ${payload['orderId']}`);


      //inform the vendor the package is delivered
      socket.emit('delivered', payload);
      console.log(`${payload.orderId} delivered`);
      
    }
  },
  }