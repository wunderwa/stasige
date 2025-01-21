#!/bin/bash

usage() { echo "$0 usage:" && grep " .)\ #" $0; exit 0; }

clear

while getopts "bcd" flag; do
  case "${flag}" in
    b) BUILD=1 ;;
    c) COMPILE=1 ;;
    d) DEPLOY=1 ;;
  esac
done
shift $((OPTIND - 1))
NAME=$1 # template name


echo "build: $BUILD compile: $COMPILE deploy: $DEPLOY site: $NAME";
