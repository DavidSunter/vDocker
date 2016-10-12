FROM mongo:latest
MAINTAINER moses.martin@skybettingandgaming.com

ADD db/mongodb.conf /etc/mongod.conf
ADD db/mongodb.service  /etc/systemd/system/mongodb.service

EXPOSE 27017
