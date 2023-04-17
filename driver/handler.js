'use strict';

const { emitter, eventPool } = require('./../eventPool');

emitter.on(eventPool[0], (payload) =>{

  emitter.emit(eventPool[1], payload);
  console.log(`DRIVER: picked up ${payload['orderId']}`)
  emitter.emit(eventPool[2], payload);

});
