import request from 'supertest';
import app from '../src/app';


describe('GraphQL Endpoint', () => {
  it('responds with hello world message', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({ query: '{ hello }' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.hello).toEqual('Hello world');
  });
});
