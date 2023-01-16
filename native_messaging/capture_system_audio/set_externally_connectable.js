#!/usr/bin/env -S ./qjs --std
// QuickJS Native Messaging host
// guest271314, 5-6-2022
function getMessage() {
  const header = new Uint32Array(1);
  std.in.read(header.buffer, 0, 4);
  const output = new Uint8Array(header[0]);
  std.in.read(output.buffer, 0, output.length);
  return output;
}

function sendMessage(message) {
  const fd = std.open('manifest.json', 'rw+');
  const json = JSON.parse(String.fromCharCode(...message));
  fd.puts(JSON.stringify(json, null, 2));
  fd.close();
  const header = Uint32Array.from(
    {
      length: 4,
    },
    (_, index) => (message.length >> (index * 8)) & 0xff
  );
  const output = new Uint8Array(header.length + message.length);
  output.set(header, 0);
  output.set(message, 4);
  std.out.write(output.buffer, 0, output.length);
  std.out.flush();
}

function main() {
  while (true) {
    const message = getMessage();
    sendMessage(message);
  }
}

try {
  main();
} catch (e) {
  std.exit(0);
}
