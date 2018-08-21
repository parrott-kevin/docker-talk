# Dockerfile
FROM local/nodejs

RUN mkdir -p /www
WORKDIR /www

COPY package.json /www
RUN yarn install

COPY . /www

CMD ["/bin/bash"]
