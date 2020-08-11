#!/usr/bin/env node
// https://github.com/simov/native-messaging
const sendMessage = require('./protocol')(handleMessage);
function handleMessage (req) {
  const {exec} = require('child_process');
  if (req.slice(0, 5) === 'parec') {
    sendMessage({done: false, req});
  }
  exec(req).on('close', data => {
    if (req === 'killall -9 parec') {
      sendMessage({done: req === 'killall -9 parec', req});
    }
  });  
};
