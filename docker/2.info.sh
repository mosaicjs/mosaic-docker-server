#!/bin/bash

cd `dirname $0`
serverdock=`cat ../.config/server.dock`
serverhost=`cat ../.config/server.host`
serverport=`cat ../.config/server.port`

echo "* serverdock=$serverdock"
echo "* serverhost=$serverhost"
echo "* serverport=$serverport"

