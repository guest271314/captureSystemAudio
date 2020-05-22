#!/bin/bash
captureSystemAudio() {
  parec -v --raw -d alsa_output.pci-0000_00_1b.0.analog-stereo.monitor | opusenc --raw-rate 44100 - output.opus
  mkvmerge -w --enable-durations -o output.webm output.opus
  rm -rf output.opus
}
captureSystemAudio
