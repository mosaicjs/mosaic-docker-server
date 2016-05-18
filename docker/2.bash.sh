#!/bin/bash
cd `dirname $0`
serverdock=`cat ../.config/server.dock`
serverhost=`cat ../.config/server.host`
serverport=`cat ../.config/server.port`

sudo docker exec -i -t $serverdock /bin/bash
