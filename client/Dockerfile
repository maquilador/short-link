FROM node:18 AS build

WORKDIR /app

COPY package.json ./
RUN npm install

ENV NODE_OPTIONS=--max-old-space-size=2048

COPY . .

RUN cp .env.docker .env && npm run build

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
