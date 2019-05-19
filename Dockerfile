FROM node:8

WORKDIR /usr/src/app

COPY package.json ./
COPY server/package.json ./server/package.json
COPY ui/package.json ./ui/package.json
COPY yarn.lock ./

RUN yarn --pure-lockfile
COPY ./common ./common

COPY ./server ./server

COPY tsconfig.json ./

RUN yarn server compile

COPY ./ui ./ui
RUN yarn ui build

EXPOSE 8080

CMD [ "yarn", "launch" ]
