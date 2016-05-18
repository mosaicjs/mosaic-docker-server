#!/bin/bash
cd `dirname $0`
serverdock=`cat ../.config/server.dock`
sudo docker kill $serverdock
sudo docker rm $serverdock

