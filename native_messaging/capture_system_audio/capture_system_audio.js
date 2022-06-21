#!/usr/bin/env -S qjs -m --std
// QuickJS Native Messaging host
// guest271314, 6-19-2022
import * as std from 'std';

function getMessage() {
  const header = new Uint32Array(1);
  std.in.read(header.buffer, 0, header.byteLength);
  const length = header[0];
  const output = new Uint8Array(length);
  std.in.read(output.buffer, 0, length);
  return output;
}

function sendMessage(json) {
  const header = Uint32Array.from(
    {
      length: 4,
    },
    (_, index) => (json.length >> (index * 8)) & 0xff
  );
  const output = new Uint8Array(header.length);
  output.set(header, 0);
  std.out.write(output.buffer, 0, output.length);
  std.out.puts(json);
  std.out.flush();
  return true;
}

function main() {
  const message = getMessage();
  sendMessage(String.fromCharCode.apply(null, message));
  const size = 1764; // 441 * 4
  let data = new Uint8Array(size),
    count = 0;
  const pipe = std.popen(
    JSON.parse(String.fromCharCode.apply(null, message)),
    'r'
  );
  while ((count = pipe.read(data.buffer, 0, data.length))) {
    if (count < size) {
      data = data.subarray(0, count);
    }
    sendMessage(`[${data}]`);
    pipe.flush();
  }
}
try {
  main();
} catch (e) {
  std.exit(0);
}
