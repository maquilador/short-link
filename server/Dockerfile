# backend/Dockerfile

FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 8081

CMD npx prisma migrate deploy && npm start
