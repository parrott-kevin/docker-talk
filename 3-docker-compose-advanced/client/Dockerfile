# Dockerfile

# using ubuntu:latest
FROM local/nodejs

# Set the work directory
RUN mkdir -p /www
WORKDIR /www

# Copy package.json and install *before* adding our application files
COPY package.json /www
RUN yarn install

# Add application files
COPY . /www

CMD ["/bin/bash"]
