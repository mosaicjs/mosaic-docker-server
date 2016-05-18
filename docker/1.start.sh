#!/bin/bash
cd `dirname $0`
serverdock=`cat ../.config/server.dock`
serverhost=`cat ../.config/server.host`
serverport=`cat ../.config/server.port`

sudo docker start $serverdock
sudo docker exec $serverdock npm start &

