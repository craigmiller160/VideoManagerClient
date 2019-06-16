#!/bin/bash

LOGS=~/video-manager/client-logs

echo "Setting up Video Manager Client environment"

if [[ ! -d $LOGS ]]; then
    mkdir -p $LOGS
fi
