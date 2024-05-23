FROM node:21-alpine@sha256:e8894d38c2f0eed0131e781e8f834578afc28d69441213ece74b229aef9385b0

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm i --production

COPY . .

ENV NODE_ENV production
CMD ["node", "src/app.js"]

EXPOSE 3001