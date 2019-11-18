FROM node:10.13.0 AS base

# Install Java.
ADD . /app
WORKDIR /app
RUN npm i
# RUN cd /app
# ENTRYPOINT npm run test
