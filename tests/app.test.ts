import request from 'supertest';
import startServer from "../src/app";
import { Server } from 'http';

let appInstance: Express.Application;
let serverInstance: Server;

beforeAll(async () => {
  const { app: appInstanceTemp, server: serverInstanceTemp } = await startServer();
  appInstance = appInstanceTemp;
  serverInstance = serverInstanceTemp;
});

afterAll(async () => {
  await serverInstance.close();
});
describe('GraphQL Product Query', () => {
  it('should fetch product details correctly', async () => {
    const response = await request(serverInstance)
      .post('/graphql')
      .send({ query: '{ product(_id: "6612b72ff4e19865c7718e05") { name vintage _id } }' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expectedData = {
      data: {
        product: {
          name: 'Product Name',
          vintage: '2022',
          _id: '6612b72ff4e19865c7718e05'
        }
      }
    };

    expect(response.body).toEqual(expectedData);
  });


  it('should fetch product details with associated producer correctly', async () => {
    const response = await request(serverInstance)
      .post('/graphql')
      .send({
        query: `
          {
            product(_id: "6612d42cf4e19865c7718e0e") {
              name
              vintage
              _id
              producer {
                name
                country
                region
              }
            }
          }
        `
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expectedData = {
      data: {
        product: {
          name: 'Product Name',
          vintage: '2022',
          _id: '6612d42cf4e19865c7718e0e',
          producer: {
            name: 'Producer Name',
            country: 'Producer Country',
            region: 'Producer Region'
          }
        }
      }
    };

    expect(response.body).toEqual(expectedData);
  });


  it.skip('should fetch products by producerId correctly', async () => {
    const response = await request(serverInstance)
      .post('/graphql')
      .send({
        query: `
          {
            products(producerId: "6612c25bf4e19865c7718e0a") {
              name
              vintage
              _id
            }
          }
        `
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expectedData = {
      data: {
        products: [
          {
            name: 'Product Name',
            vintage: '2022',
            _id: '6612d42cf4e19865c7718e0e'
          },
          {
            name: 'Product Name 1',
            vintage: '2022',
            _id: '6612f284f4e19865c7718e14'
          },
          {
            name: 'Product Name 2',
            vintage: '2022',
            _id: '6612f284f4e19865c7718e16'
          },
          {
            name: 'Product Name 3',
            vintage: '2022',
            _id: '6612f284f4e19865c7718e18'
          },
          {
            name: 'Product Name 4',
            vintage: '2022',
            _id: '6612f284f4e19865c7718e1a'
          },
          {
            name: 'Product Name 5',
            vintage: '2022',
            _id: '6612f284f4e19865c7718e1c'
          }
        ]
      }
    };

    expect(response.body).toEqual(expectedData);
  });


});

describe('GraphQL Producer Query', () => {
  it('should fetch producer details correctly', async () => {
    const response = await request(serverInstance)
      .post('/graphql')
      .send({ query: '{ producer(_id: "6612c25bf4e19865c7718e0a") { name country region _id } }' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expectedData = {
      data: {
        producer: {
          name: 'Producer Name',
          country: 'Producer Country',
          region: 'Producer Region',
          _id: '6612c25bf4e19865c7718e0a'
        }
      }
    };

    expect(response.body).toEqual(expectedData);
  });

});

describe('GraphQL Product Mutation', () => {
  it('should create multiple products correctly', async () => {
    const response = await request(serverInstance)
      .post('/graphql')
      .send({
        query: `
          mutation {
            createProducts(input: [
              { vintage: "2022", name: "Product 1", producerId: "6612c25bf4e19865c7718e0a" },
              { vintage: "2023", name: "Product 2", producerId: "6612c25bf4e19865c7718e0a" },
              { vintage: "2024", name: "Product 3", producerId: "6612c25bf4e19865c7718e0a" }
            ]) {
              name
              vintage
              _id
            }
          }
        `
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.createProducts.length).toBe(3);
    expect(response.body.data.createProducts[0].name).toBe('Product 1');
    expect(response.body.data.createProducts[0].vintage).toBe('2022');
    expect(response.body.data.createProducts[0]).toHaveProperty('_id');
    expect(response.body.data.createProducts[1].name).toBe('Product 2');
    expect(response.body.data.createProducts[1].vintage).toBe('2023');
    expect(response.body.data.createProducts[1]).toHaveProperty('_id');
    expect(response.body.data.createProducts[2].name).toBe('Product 3');
    expect(response.body.data.createProducts[2].vintage).toBe('2024');
    expect(response.body.data.createProducts[2]).toHaveProperty('_id');
  });

});

describe('GraphQL UpdateProduct Mutation', () => {
  it('should update product name correctly', async () => {
    const response = await request(serverInstance)
      .post('/graphql')
      .send({ query: 'mutation { updateProduct(_id: "6612f284f4e19865c7718e16", input: { name: "New Product Name" }) { _id name vintage producer { _id name country region } } }' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expectedData = {
      data: {
        updateProduct: {
          _id: '6612f284f4e19865c7718e16',
          name: 'New Product Name',
          vintage: '2022',
          producer: {
            _id: '6612c25bf4e19865c7718e0a',
            name: 'Producer Name',
            country: 'Producer Country',
            region: 'Producer Region'
          }
        }
      }
    };

    expect(response.body).toEqual(expectedData);
  });
});

describe('DeleteProducts Mutation', () => {
  it('should delete products correctly', async () => {
    const response = await request(serverInstance)
      .post('/graphql')
      .send({
        query: `mutation {
          deleteProducts(ids: ["66130d7a9740133fbb890e6d", "66130d7a9740133fbb890e6c", "66130dd585dea9a4fc1fc344", "66130dd585dea9a4fc1fc345", "66130dd585dea9a4fc1fc343"])
        }`
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const expectedData = {
      data: {
        deleteProducts: true
      }
    };

    expect(response.body).toEqual(expectedData);
  });
});
