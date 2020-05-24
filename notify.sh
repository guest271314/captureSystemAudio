#!/bin/sh
start() {
  inotifywait -m -e open $HOME/localscripts/captureSystemAudio.txt | while read file; 
  do 
    echo "$file" | grep "captureSystemAudio.txt OPEN" && $HOME/localscripts/captureSystemAudio.sh
  done
}
stop() {
  inotifywait -m -e open $HOME/localscripts/stopSystemAudioCapture.txt | while read file;
  do 
    echo "$file" | grep "stopSystemAudioCapture.txt OPEN" && $HOME/localscripts/stopSystemAudioCapture.sh
  done
}
start & stop
