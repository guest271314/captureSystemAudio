#!node
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
  const msgLen = input.readUInt32LE(0);
  const dataLen = msgLen + 4;
  if (input.length >= dataLen) {
    const content = input.slice(4, dataLen);
    const json = JSON.parse(content.toString());
    handleMessage(json);
  }
});

function sendMessage(msg) {
  const buffer = Buffer.from(JSON.stringify(msg));
  const header = Buffer.alloc(4);
  header.writeUInt32LE(buffer.length, 0);
  const data = Buffer.concat([header, buffer]);
  process.stdout.write(data);
}

process.on('uncaughtException', (err) => {
  sendMessage({ error: err.toString() });
});

function handleMessage(input) {
  const [command, ...args] = input.split(' ');
  let { spawn } = require('child_process');
  let child = spawn(command, args);
  child.stdout.on('data', (data) => {
    sendMessage([...new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT)]);
  });
  child.stderr.on('data', (data) => {
    // sendMessage(data);
  });
  child.on('close', (code) => {
   // sendMessage('closed');
  });
}
