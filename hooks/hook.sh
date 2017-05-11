#!/bin/sh

unset 'GIT_DIR'
cd /home/jorge/photoTourist.git
sudo forever stop src/server/app.js
git fetch origin && git pull origin master && bower install --allow-root  && npm install && gulp build && sudo PORT=443 NODE_ENV=build forever start ./src/server/app.js
exec git update-server-info
