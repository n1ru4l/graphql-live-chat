# GraphQL Live Chat

Simple Web Chat Application based on https://github.com/D1plo1d/graphql-live-subscriptions

![demo](https://user-images.githubusercontent.com/14338007/77768455-cb594880-7042-11ea-95c7-89d98a80f6b1.gif)

## Stack Overview

### Frontend

- TypeScript
- React
- Relay

### Backend

- GraphQL (Live) Subscriptions
- GraphQL Codegen
- Express
- TypeScript
- Immer.js

## How can I run it?

### Locally (Development Mode)

```bash
yarn install
yarn lerna bootstrap
yarn lerna run start
```

Visit `http://127.0.0.1:3000`.

### Production (Docker Mode)

```bash
docker build -t graphql-live-chat .
docker run -p 8080:3001 graphql-live-chat
```

Visit `http://127.0.0.0.1:8080`.
