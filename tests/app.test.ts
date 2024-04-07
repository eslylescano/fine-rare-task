import request from 'supertest';
import app from '../src/app';


describe('GraphQL Product Query', () => {
  it('should fetch product details correctly', async () => {
    const response = await request(app)
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

});

describe('GraphQL Producer Query', () => {
  it('should fetch producer details correctly', async () => {
    const response = await request(app)
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
