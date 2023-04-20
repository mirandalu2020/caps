'use strict';

const { eventPool } = require('./../eventPool');

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3001;
const DeliveryQueue = require('./lib/deliveryQueue');
const { payload } = require('../clients/widget-vendor/widget-handler');

const io = new Server(PORT);

let capsServer = io.of('/caps');
let pickupQue = new DeliveryQueue();
let deliveredQueue = new DeliveryQueue();

function eventLog(event, payload){
  console.log(`Event: ${event},
  time: ${new Date(Date.now()).toDateString()},
  payload:{
    store: ${payload['store']},
    orderId: ${payload['orderId']},
    customer: ${payload['customer']},
    address: ${payload['address']},
  } `)
}

  capsServer.on('connection', (socket)=>{
    console.log('CLIENT HAS CONNECTED TO CAPS', socket.id);

    //joining the group of your company
    socket.on('join-group', (payload)=>{
      console.log('room joined!', payload);
      socket.join(payload['store'])
    });

    //eventlistender for 'pickup'
    socket.on(eventPool[0], (payload) =>{
      // capsServer.to(payload.store).emit(eventPool[0], payload);
      socket.broadcast.emit(eventPool[0], payload);
      // eventLog(eventPool[0], payload);

      let toBePickedUp = pickupQue.read(payload.store);
      if (toBePickedUp){
        pickupQue.store(payload.store, payload)
      } else{
        let toBePickedUp = new DeliveryQueue();
        toBePickedUp.store(payload.orderId, payload);
        console.log(toBePickedUp);
        pickupQue.store(payload.store, toBePickedUp);
      }
      console.log('STORING ', pickupQue.data);
      capsServer.emit(eventPool[0], pickupQue.data)
    });

    
    socket.on(eventPool[1], (payload) =>{
      socket.to(payload.store).emit(eventPool[1],payload);
      // eventLog(eventPool[1], payload)
    });
    
    socket.on(eventPool[2], (payload) =>{
      socket.to(payload.store).emit(eventPool[2],payload);
      // eventLog(eventPool[2], payload);

      console.log('Payload to be Deleted', payload, deliveredQueue)
      let readDelivered = deliveredQueue.read(payload.store);
      console.log('read delivered', readDelivered)

      let completedDelivered = pickupQue.remove(payload['store']);
      console.log('confirmed', completedDelivered);
      socket.emit('confirmed', completedDelivered);
    });

    socket.on('received', (payload)=>{
      //read pickup and complete
      console.log('completed pickup', payload)
      let readPickUp = pickupQue.read(payload.store);
      console.log(readPickUp)
      //remove pickup once complete
      let completedPickUp = readPickUp.remove(payload.store);
      console.log('CONFIRMED ', completedPickUp);
      //store the completed pickup into deliveredQueue
      deliveredQueue.store(completedPickUp);
      socket.emit('received', completedPickUp);
    })

    socket.on('getAll', (payload)=>{
      console.log('getAll ', payload, pickupQue, deliveredQueue)
      console.log(pickupQue.data);
      console.log('PICKING UP ', pickupQue.data['widget-vendor'])
      let orders = pickupQue.data['widget-vendor'];
      let orderKeys = Object.keys(orders);
      orderKeys.forEach(order => {
        console.log(order);
        pickupQue.read(order);
        pickupQue.remove(order);
        deliveredQueue.store(payload.store, orders['data'][order])
        console.log('DELIVERED QUEUE', deliveredQueue)
      }
        )
      // orders.forEach(order => console.log(order))
      socket.emit('getAll', payload);
    })


  })
  
  