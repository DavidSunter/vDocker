FROM my-nodejs:latest
MAINTAINER moses.martin@skybettingandgaming.com

ADD app /app
RUN cd /app && npm install
CMD ["node", "/app/app.js"]

ARG SERVER_PORT_FROM_APP=3000
ENV SERVER_PORT_FROM_APP ${SERVER_PORT_FROM_APP}
EXPOSE ${SERVER_PORT_FROM_APP}
