# Dockerfile

# using lts/boron
FROM node:boron

RUN mkdir -p /www
WORKDIR /www

COPY package.json /www
RUN npm install

COPY . /www

CMD ["/bin/bash"]
