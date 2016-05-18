#!/bin/bash

#------------------------------------------
# Variables initialization 
cd `dirname $0`
cd ..
dir=`pwd`
serverdock=`cat ./.config/server.dock`
serverhost=`cat ./.config/server.host`
serverport=`cat ./.config/server.port`
serverport_internal=9876
sudo docker build -t $serverdock -f ./docker/Dockerfile .

sudo docker build -t $serverdock "$dir/docker"

sudo docker run -t --name $serverdock \
    -p $serverhost:$serverport:$serverport_internal \
    -v "$dir/server:/app/server:rw"\
    -d $serverdock

sudo docker exec $serverdock npm install

sudo docker stop $serverdock