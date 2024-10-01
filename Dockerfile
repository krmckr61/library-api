FROM node:21-alpine3.18

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

RUN chmod +x entrypoint.sh
RUN chmod 755 entrypoint.sh

ARG APP_NAME
ARG PORT

ENV APP_NAME=${APP_NAME}

ENTRYPOINT ["./entrypoint.sh"]
