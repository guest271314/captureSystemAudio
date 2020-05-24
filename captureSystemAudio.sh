#!/bin/bash
captureSystemAudio() {
  parec -v --raw -d alsa_output.pci-0000_00_1b.0.analog-stereo.monitor | opusenc --raw-rate 44100 - $HOME/localscripts/output.opus
  mkvmerge -w --enable-durations -o $HOME/localscripts/output.webm $HOME/localscripts/output.opus
  rm -rf $HOME/localscripts/output.opus
}
captureSystemAudio
