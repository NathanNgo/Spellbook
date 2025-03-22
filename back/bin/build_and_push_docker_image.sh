#!/bin/sh

aws ecr get-login-password --region ap-southeast-2 | docker login --username AWS --password-stdin 402444896897.dkr.ecr.ap-southeast-2.amazonaws.com

docker build --platform linux/amd64 -t spellbook/spellbook-api-server .
docker tag spellbook/spellbook-api-server:latest 402444896897.dkr.ecr.ap-southeast-2.amazonaws.com/spellbook/spellbook-api-server:latest
docker push 402444896897.dkr.ecr.ap-southeast-2.amazonaws.com/spellbook/spellbook-api-server:latest
