'use strict';

const {emitter, eventPool} = require('./../eventPool');

//vendor handler
emitter.on(eventPool[2], (payload) =>{
  console.log('Thank you for your order, ', payload['customer'])
});

emitter.emit(eventPool[0], 
  {
  store: '1-206-flowers',
  orderId: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
  customer: 'Jamal Braun',
  address: 'Schmittfort, LA',
}
);