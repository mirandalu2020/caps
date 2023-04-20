'use strict';

require('./handler');
// const { emitter } = require('./../eventPool');
const { handlePickUp, joinRoom } = require('./handler');


describe('Testing driver handler to listen for and emitting events', ()=>{

  test('Can the driver handle a pickup event', ()=>{
    let payload=
    { store: '1-206-flowers',
      orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
      customer: 'Jamal Braun',
      address: 'Schmittfort, LA' };

    let socket = {
      emit: jest.fn(),
    }

    handlePickUp(socket, payload);
    expect(socket.emit).toHaveBeenCalled();
  })

  test('Can the driver join a room', ()=>{
    let socket = {
      emit: jest.fn(),
    }

    let payload=
    { store: '1-206-flowers',
      orderID: 'e3669048-7313-427b-b6cc-74010ca1f8f0',
      customer: 'Jamal Braun',
      address: 'Schmittfort, LA' };

    joinRoom(socket, payload, 'test-room');
    expect(socket.emit).toHaveBeenCalled();
  })
})