#!/usr/bin/env -S python3 -u
# https://github.com/mdn/webextensions-examples/pull/157

import sys, json, struct, os, subprocess
from shlex import split

try:
    # Python 3.x version
    # Read a message from stdin and decode it.
    def getMessage():
        rawLength = sys.stdin.buffer.read(4)
        if len(rawLength) == 0:
            sys.exit(0)
        messageLength = struct.unpack('@I', rawLength)[0]
        message = sys.stdin.buffer.read(messageLength).decode('utf-8')
        return json.loads(message)

    # Encode a message for transmission,
    # given its content.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent, separators=(',', ':')).encode('utf-8')
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}

    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.buffer.write(encodedMessage['length'])
        sys.stdout.buffer.write(encodedMessage['content'])
        sys.stdout.buffer.flush()

    receivedMessage = getMessage()
    process = subprocess.Popen(split(receivedMessage), stdout=subprocess.PIPE)
    os.set_blocking(process.stdout.fileno(), False)

    while True:      
        for chunk in iter(lambda: process.stdout.read(), b''):
            if chunk is not None:
                encoded = [int('%02X' % i, 16) for i in chunk]
                sendMessage(encodeMessage(encoded))   
                
except Exception as e:
    sys.stdout.buffer.flush()
    sys.stdin.buffer.flush()
    sys.exit(0)
