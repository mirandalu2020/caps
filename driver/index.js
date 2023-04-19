'use strict';

const { io } = require('socket.io-client');
const { handlePickUp, joinRoom } = require('./handler');
const { payload } = require('../vendor/handler');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001/caps';

let capsSocket = io(SERVER_URL);

capsSocket.on('pickup');

joinRoom(capsSocket, payload, 'join-group');
handlePickUp(capsSocket, payload);