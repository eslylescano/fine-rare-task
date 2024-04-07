import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Product {
    _id: ID!
    vintage: String!
    name: String!
  }

  type Producer {
    _id: ID!
    name: String!
    country: String
    region: String
  }

  type Query {
    product(_id: ID!): Product
    producer(_id: ID!): Producer
  }

`);