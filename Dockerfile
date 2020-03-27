FROM node:12-slim as frontend-builder

WORKDIR /usr/context

COPY packages/frontend/package.json .
COPY packages/frontend/yarn.lock .
RUN yarn install --frozen-lockfile

COPY packages/frontend/tsconfig.json .
COPY packages/frontend/src/ ./src/
COPY packages/frontend/public/ ./public/

RUN yarn build

FROM node:12-slim as backend-builder

WORKDIR /usr/context

COPY packages/backend/package.json .
COPY packages/backend/yarn.lock .
RUN yarn install --frozen-lockfile

COPY packages/backend/tsconfig.json .
COPY packages/backend/src/ ./src/

RUN yarn build

FROM node:12-slim as backend-dependency-builder

WORKDIR /usr/context
COPY packages/backend/package.json .
COPY packages/backend/yarn.lock .
COPY ./packages/backend/patches ./patches
RUN yarn install --frozen-lockfile
RUN npm prune --production
COPY ./.yarnclean_ ./.yarnclean
RUN yarn autoclean --force
RUN find . -type d -empty -delete

FROM m03geek/alpine-node:milli-12 as application

WORKDIR /usr/app

ARG NODE_ENV="production"
ENV NODE_ENV="production"
COPY --from=backend-builder /usr/context/package.json ./
COPY --from=backend-dependency-builder /usr/context/node_modules/ ./node_modules/

COPY --from=backend-builder /usr/context/build/ ./lib
COPY --from=frontend-builder /usr/context/build ./public/

CMD ["node", "lib/index.js"]
