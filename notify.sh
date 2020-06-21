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

openPavuControl() {
  inotifywait -m -e open $HOME/localscripts/openpavucontrol.txt | while read file; 
    do 
      echo "$file" | grep "openpavucontrol.txt OPEN" && $HOME/localscripts/openpavucontrol.sh
    done
}

closePavuControl() {
  inotifywait -m -e open $HOME/localscripts/closepavucontrol.txt | while read file;
    do 
      echo "$file" | grep "closepavucontrol.txt OPEN" && $HOME/localscripts/closepavucontrol.sh
    done
}
  
start & stop & openPavuControl & closePavuControl
