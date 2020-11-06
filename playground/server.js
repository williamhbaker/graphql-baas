const express = require('express');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;

const app = express();
const port = 3000;

app.get('/', expressPlayground({ endpoint: '/graphql' }));

app.listen(port, () => {
  console.log(`GraphQL playground listening at localhost:${port}`);
});
