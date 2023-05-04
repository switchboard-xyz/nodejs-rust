FROM node:18
USER root
RUN apt-get update

# Get Ubuntu packages
RUN apt-get install -y \
    build-essential \
    curl

# Update new packages
RUN apt-get update

# Get Rust
RUN curl https://sh.rustup.rs -sSf | bash -s -- -y

ENV PATH="/root/.cargo/bin:${PATH}"
RUN exec $SHELL
WORKDIR /usr/src/app
COPY . .
WORKDIR /usr/src/app/nodejs-rust
RUN yarn install && yarn build
WORKDIR /usr/src/app
RUN npm i
RUN npm i nodejs-rust/
EXPOSE 8080
ENV PORT 8080
CMD [ "node", "index.js" ]
