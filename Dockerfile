FROM node:18
ENV NODE_ENV prod

WORKDIR /usr/src/app
COPY package.json /usr/src/app
ADD . /usr/src/app
RUN npm run build

CMD [ "node", "./build/src/main.js" ]
EXPOSE 3000
