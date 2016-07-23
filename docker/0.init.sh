#!/bin/bash

#------------------------------------------
# Variables initialization 
cd `dirname $0`
cd ..
dir=`pwd`
serverdock=`cat ./.config/server.dock`
serverport=`cat ./.config/server.port`
sudo docker build -t $serverdock -f ./docker/Dockerfile .

sudo docker build -t $serverdock "$dir/docker"

sudo docker run -t \
    --net="host" \
    --name $serverdock \
    -v "$dir/server:/app/server:rw"\
    -v "$dir/services:/app/services:rw"\
    -d $serverdock

sudo docker exec $serverdock npm install

sudo docker stop $serverdock