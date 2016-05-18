#!/bin/bash

cd `dirname $0`
cd ..
dir=`pwd`

sudo rm -fr "$dir/server/cache" 
"$dir/docker/4.stop.sh" && "$dir/docker/1.start.sh"
