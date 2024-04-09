import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Product {
    _id: ID!
    vintage: String!
    name: String!
    producer: Producer!
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
    products(producerId: ID!): [Product]
  }

  type Mutation {
    createProducts(input: [CreateProductInput]!): [Product]!
    createProducer(input: CreateProducerInput!): Producer!
    updateProduct(_id: ID!, input: UpdateProductInput!): Product
    deleteProducts(ids: [ID]!): Boolean
    startCSVImport: Boolean
  }

  input CreateProductInput {
    vintage: String!
    name: String!
    producerId: ID!
  }

  input UpdateProductInput {
    vintage: String
    name: String
  }

  input CreateProducerInput {
    name: String!
    country: String
    region: String
  }

`);
