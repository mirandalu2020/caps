'use strict';

const { io } = require('socket.io-client');
const { sendPickup, payload } = require('./handler');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/caps';

let capsSocket = io(SERVER_URL);

capsSocket.on('delivered');

sendPickup(capsSocket, payload);