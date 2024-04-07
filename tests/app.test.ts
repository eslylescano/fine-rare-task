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


  it('should fetch product details with associated producer correctly', async () => {
    const response = await request(app)
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
  

  it('should fetch products by producerId correctly', async () => {
    const response = await request(app)
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
