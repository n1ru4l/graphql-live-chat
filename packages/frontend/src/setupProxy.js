"use strict";

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/graphql", {
      target: "http://127.0.0.1:3001",
      changeOrigin: true,
      ws: true,
    })
  );
};
