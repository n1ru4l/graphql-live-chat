"use strict";

const fs = require("fs");
const { buildSchema } = require("graphql");
const { mergeTypes } = require("merge-graphql-schemas");

// TODO: use AST parser instead
const REGEX = () => /export const typeDefs = \/\* GraphQL \*\/ `([^`]*)`/s;

/**
 * Custom schema loader for modules located under src/graphql/modules
 * Each file must have a typeDefs export.
 */
module.exports = (filePaths) => {
  if (Array.isArray(filePaths) === false) {
    filePaths = [filePaths];
  }
  const schemaParts = [];
  for (const filePath of filePaths) {
    const contents = fs.readFileSync(filePath, "utf-8");
    const result = REGEX().exec(contents);
    if (!result) {
      throw new Error(`Invalid '${filePath}'. exports no schema definition.`);
    }
    const [, schema] = result;
    schemaParts.push(schema);
  }
  return buildSchema(mergeTypes(schemaParts));
};
