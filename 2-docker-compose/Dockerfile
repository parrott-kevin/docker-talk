# Dockerfile

# using lts/boron
FROM node:carbon-alpine

RUN mkdir -p /www
WORKDIR /www

COPY package.json /www
RUN yarn install

COPY . /www

CMD ["/bin/ash"]
