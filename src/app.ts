import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import connectDB from './db';
import { schema } from './schema';
import { resolvers } from './resolvers';

connectDB();

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, 
}));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});

export default app; 
