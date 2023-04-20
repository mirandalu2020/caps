'use strict';

const Chance = require('chance');
const chance = new Chance();
const {emitter, eventPool} = require('./../../eventPool');

//vendor handler

module.exports = {

  sendPickUp: function (socket, payload) {
    let order = payload;
    socket.emit('pickup', order);
    socket.emit('join-group', order)
  },

  handleDelivered: function(socket) {
    return function(payload){
      console.log(payload)
      socket.emit('received', payload);
      // socket.emit('delivered', payload)
      console.log('Thank you for your order, ', payload['customer'])
    }
  },

  generatePayload: function () {
    return {
      store: 'widget-vendor',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    }
  },
}

