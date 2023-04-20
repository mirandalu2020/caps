'use strict';

const { io } = require('socket.io-client');
const Chance = require('chance');
const chance = new Chance();

const { sendPickUp, 
  generatePayload, 
  handleDelivered } = require('./widget-handler');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/caps';

let capsSocket = io(SERVER_URL);

capsSocket.on('delivered', handleDelivered(capsSocket))


sendPickUp(capsSocket, generatePayload());