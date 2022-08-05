FROM node:14-alpine as builder
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g typescript
RUN npm install -g ts-node
RUN npm install

COPY ./ ./

RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/public /app/public
COPY --from=builder /app/dist /app/dist

EXPOSE 5050
CMD ["node", "dist/index.js"]