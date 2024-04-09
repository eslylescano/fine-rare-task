
# Simple Product API


This project aims to build a simple Product API in TypeScript, allowing management of product and producer entities using MongoDB. The API is implemented with GraphQL as the preferred interface.

## Requirements

- Node.js (version 14 or above)
- MongoDB
- Docker (optional, for running MongoDB in a container)

## Installation
1. Clone this repository to your local machine:
```bash
git clone https://github.com/eslylescano/fine-rare-task.git
```
2. Navigate to the project directory:
```bash
cd fine-rare-task
```

3. Install dependencies::
```bash
npm install
```

```bash
docker-compose up
```

## Usage

To start the server, run:

```bash
npm run start
```
This will start the server at http://localhost:4000/graphql.

## GraphQL Playground

You can access the GraphQL Playground by navigating to http://localhost:4000/graphql in your browser. Here, you can interact with the API using GraphQL queries and mutations.

## Available Queries

### Part 1

### Mutations

1. Create Producer first

```bash
mutation {
  createProducer(input: { 
    name: "Fake Producer", 
    country: "Fake Country", 
    region: "Fake Region" 
  }) {
    _id
    name
    country
    region
  }
}
```

This will response something like:
```bash
{
  "data": {
    "createProducer": {
      "_id": "661543cdf96333872b907b69",
      "name": "Fake Producer",
      "country": "Fake Country",
      "region": "Fake Region"
    }
  }
}
```
2. Create multiple products:
```bash
mutation {
  createProducts(input: [
    { vintage: "2022", name: "Product 1", producerId: "661543cdf96333872b907b69" },
    { vintage: "2023", name: "Product 2", producerId: "661543cdf96333872b907b69" }
  ]) {
    _id
    vintage
    name
  }
}

```
3. Update product:

```bash
mutation {
  updateProduct(_id: "6615454bf96333872b907b79", input: { vintage: "2024" }) {
    _id
    vintage
    name
    producer {
      _id
      name
      country
      region
    }
  }
}
```

It will return something like this:

```bash
{
  "data": {
    "updateProduct": {
      "_id": "6615454bf96333872b907b79",
      "vintage": "2024",
      "name": "Product 1",
      "producer": {
        "_id": "661543cdf96333872b907b69",
        "name": "Fake Producer",
        "country": "Fake Country",
        "region": "Fake Region"
      }
    }
  }
}
```

4. Delete products:

```bash
mutation {
  deleteProducts(ids: ["6615454bf96333872b907b79"]) 
}
```
It will return:

```bash
{
  "data": {
    "deleteProducts": true
  }
}
```

### Queries

1. Query products by producer _id.

```bash

query {
  products(producerId: "661543cdf96333872b907b69") {
    _id
    vintage
    name
  }
}
```

It will return something like this:

```bash

{
  "data": {
    "products": [
      {
        "_id": "66154533f96333872b907b6e",
        "vintage": "2023",
        "name": "Product 2"
      },
      {
        "_id": "66154533f96333872b907b6d",
        "vintage": "2022",
        "name": "Product 1"
      }
    ]
  }
}
```

2. Query a single product by its _id.

```bash

query {
  product(_id: "6615454bf96333872b907b7a") {
    _id
    vintage
    name
    producer {
      _id
      name
      country
      region
    }
  }
}

```

It will return this:

```bash

{
  "data": {
    "product": {
      "_id": "6615454bf96333872b907b7a",
      "vintage": "2023",
      "name": "Product 2",
      "producer": {
        "_id": "661543cdf96333872b907b69",
        "name": "Fake Producer",
        "country": "Fake Country",
        "region": "Fake Region"
      }
    }
  }
}

```

### Part 2
With this query will import the csv file:

```bash

mutation {
  startCSVImport
}

```

Returning this:

```bash

{
  "data": {
    "startCSVImport": true
  }
}

```