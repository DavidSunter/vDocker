FROM my-nodejs:latest
MAINTAINER moses.martin@skybettingandgaming.com

ADD api /api
RUN cd /api && npm install
CMD ["node", "/api/app.js"]

ARG SERVER_PORT_FROM_API=3000
ENV SERVER_PORT_FROM_API ${SERVER_PORT_FROM_API}
EXPOSE ${SERVER_PORT_FROM_API}
