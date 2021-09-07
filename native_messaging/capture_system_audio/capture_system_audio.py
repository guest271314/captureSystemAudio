#!/usr/bin/env python3
# https://github.com/mdn/webextensions-examples/pull/157

import sys
import json
import struct
import base64
import argparse
import os
import subprocess
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
        return json.loads(message)["message"]

    # Encode a message for transmission,
    # given its content.
    def encodeMessage(messageContent):
        encodedContent = json.dumps(messageContent).encode('utf-8')
        encodedLength = struct.pack('@I', len(encodedContent))
        return {'length': encodedLength, 'content': encodedContent}

    # Send an encoded message to stdout
    def sendMessage(encodedMessage):
        sys.stdout.buffer.write(encodedMessage['length'])
        sys.stdout.buffer.write(encodedMessage['content'])
        sys.stdout.buffer.flush()

    while True:
        receivedMessage = getMessage()
        process = subprocess.Popen(split(receivedMessage), stdout=subprocess.PIPE)
        os.set_blocking(process.stdout.fileno(), False)
        for chunk in iter(lambda: process.stdout.read(1760), b''):
            if chunk is not None:
                encoded = base64.b64encode(chunk).decode()
                sendMessage(encodeMessage({"value": encoded, "done": 0}))
        sendMessage(encodeMessage({"value": "", "done": 1}))
except AttributeError:
    sys.exit(0)
