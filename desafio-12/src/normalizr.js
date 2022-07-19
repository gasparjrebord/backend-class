const normalizr = require("normalizr");

const authorSchema = new normalizr.schema.Entity(
  "authors",
  {},
  { idAttribute: "email" }
);
const messageSchema = new normalizr.schema.Entity(
  "messages",
  {
    author: authorSchema,
  },
  { idAttribute: "_id" }
);

function normalizedChats(data) {
  const normalized = normalizr.normalize(data, [messageSchema]);
  return normalized
}

module.exports = normalizedChats
