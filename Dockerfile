FROM node:18.19.0-alpine3.19

WORKDIR /usr/src/app

COPY . .
RUN npm ci --production

USER 1000
EXPOSE 3000
CMD ["node", "src/index.js"]
