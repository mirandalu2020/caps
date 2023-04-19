'use strict';

// const { emitter } = require('../eventPool');

//create a variable to the object from vendor-handler
let { sendPickup, handleDelivered } = require('./handler');



describe('Testing driver handler to listen for and emitting events', ()=>{

  test('Can the vendor send a pickup to the server', ()=>{

    let payload=
    { store: '1-206-flowers',
      orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
      customer: 'Jamal Braun',
      address: 'Schmittfort, LA' };

    let socket = {
      emit: jest.fn(),
    }
    
    sendPickup(socket, payload);
    expect(socket.emit).toHaveBeenCalled();
  })

  test('Can the vendor handle a delivered dvent', ()=>{
    let payload = {
      cusomer: 'test',
    }

    console.log = jest.fn()
    handleDelivered(payload);
    expect(console.log).toHaveBeenCalled()
  })
})