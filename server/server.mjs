import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import { schema } from './graphql.mjs'

const app = express();

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000);

console.log('Running a GraphQL API server at http://localhost:4000/graphql ✅');
