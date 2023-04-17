'use strict';

const { eventPool } = require('./eventPool');
const { emitter } = require('./eventPool');

eventPool.forEach(event => {
  emitter.on(event, (payload) => 
    console.log(
    `Event: ${event},
    time: ${Date.now()},
    payload:{
      store: ${payload['store']},
      orderId: ${payload['orderId']},
      customer: ${payload['customer']},
      address: ${payload['address']},
    } `)  
  );
});

require('./driver/handler');
require('./vendor/handler');

