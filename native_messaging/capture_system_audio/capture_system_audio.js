#!/usr/bin/env -S qjs -m --std
// QuickJS Native Messaging host
// guest271314, 5-6-2022

function getMessage() {
  const header = new Uint32Array(1);
  std.in.read(header.buffer, 0, 4);
  const [length] = header;
  const output = new Uint8Array(length);
  std.in.read(output.buffer, 0, length);
  return output;
}

function sendMessage(json) {
  std.out.write(Uint32Array.of(json.length).buffer, 0, 4);
  std.out.puts(json);
  std.out.flush();
}

function main() {
  const message = getMessage();
  const size = 1764;
  let data = new Uint8Array(size);
  const pipe = std.popen(
    JSON.parse(String.fromCharCode.apply(null, message)),
    'r'
  );
  while (pipe.read(data.buffer, 0, data.length)) {
    sendMessage(`[${data}]`);
    pipe.flush();
  }
}
try {
  main();
} catch (e) {
  std.exit(0);
}
