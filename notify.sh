#!/bin/sh
start() {
  inotifywait -m -e open captureSystemAudio.txt | while read file; 
  do 
    echo "$file" | grep "captureSystemAudio.txt OPEN" && ./captureSystemAudio.sh
  done
}
stop() {
  inotifywait -m -e open stopSystemAudioCapture.txt | while read file;
  do 
    echo "$file" | grep "stopSystemAudioCapture.txt OPEN" && ./stopSystemAudioCapture.sh
  done
}
start & stop
