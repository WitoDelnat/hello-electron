# # # # # # # # # # # # # # # #
# BUILDER
# # # # # # # # # # # # # # # #
FROM node:14-slim AS builder
WORKDIR /build

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY . .
RUN yarn build

# # # # # # # # # # # # # # # #
# DIST
# # # # # # # # # # # # # # # #
FROM node:14-slim
WORKDIR /app

ENV NODE_ENV=production
ENV YARN_CACHE_FOLDER /app/cache

COPY package.json .
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile && yarn cache clean

COPY --from=builder /build/dist ./dist
COPY config ./config

EXPOSE 8080
CMD ["yarn", "start"]
