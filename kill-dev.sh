#!/bin/bash

WORKDIR=`pwd`

tmux kill-session -t spellbookdev

(cd ${WORKDIR}/back; docker compose down)
