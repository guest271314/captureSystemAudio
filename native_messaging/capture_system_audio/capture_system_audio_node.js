#!/usr/bin/env -S UV_THREADPOOL_SIZE=1 /path/to/node --max-old-space-size=6 --expose-gc --v8-pool-size=1 --jitless
// Node.js Native Messaging host
// https://github.com/simov/native-messaging/blob/master/protocol.js
// https://github.com/simov/native-messaging/blob/master/nodejs/example.js
// Might be good to use an explicit path to node on the shebang line
// in case it isn't in PATH when launched by Chrome
process.stdin.on('readable', () => {
  let input = [];
  let chunk;
  while ((chunk = process.stdin.read())) {
    input.push(chunk);
  }
  input = Buffer.concat(input);
  let msgLen = input.readUInt32LE(0);
  let dataLen = msgLen + 4;
  if (input.length >= dataLen) {
    let content = input.slice(4, dataLen);
    handleMessage(JSON.parse(content.toString()));
    input = chunk = msgLen = dataLen = null;
    global.gc();
  }
});

function sendMessage(msg) {
  let buffer = Buffer.from(JSON.stringify(msg));
  let header = Buffer.alloc(4);
  header.writeUInt32LE(buffer.length, 0);
  let data = Buffer.concat([header, buffer]);
  process.stdout.write(data);
  msg = buffer = header = data = null;
  global.gc();
}

process.on('uncaughtException', (err) => {
  sendMessage({ error: err.toString() });
});

function handleMessage(input) {
  let [command, ...args] = input.split(' '),
    chunk;
  let { spawn } = require('child_process');
  let child = spawn(command, args);
  function read() {
    while (chunk = child.stdout.read()) {
      sendMessage([...chunk]);
      chunk = null;
      global.gc();
    }
  }
  child.stdout.on('readable', read);
  input = command = args = null;
}
