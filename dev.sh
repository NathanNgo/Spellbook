#!/bin/bash

# This prevents recursive sessions as tmux sessions don't die when the terminal is closed.
tmux kill-session -t dev

tmux new-session -d -s dev

tmux split-window -h

tmux send-keys -t dev:0.0 "cd back/ && yarn start" C-m

tmux send-keys -t dev:0.1 "cd front/ && yarn dev" C-m

tmux attach -t dev