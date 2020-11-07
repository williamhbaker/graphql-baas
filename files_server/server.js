const express = require('express');

const { server } = require('./config/apollo');
const app = express();

app.use(express.static('public'));
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
