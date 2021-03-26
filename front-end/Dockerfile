FROM node:15.10.0 AS ui-build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:15.10.0
WORKDIR /app
COPY --from=ui-build / ./build

EXPOSE 8080

CMD ["node", "./bundle.js"]