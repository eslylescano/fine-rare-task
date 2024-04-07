import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Product {
    _id: ID!
    vintage: String!
    name: String!
  }

  type Query {
    product(_id: ID!): Product
  }

`);
