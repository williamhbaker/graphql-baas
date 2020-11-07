import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import { createUploadLink } from 'apollo-upload-client';

const apolloCache = new InMemoryCache();

const uploadLink = createUploadLink({
  uri: 'graphql',
  headers: {
    'keep-alive': 'true',
  },
});

const client = new ApolloClient({
  cache: apolloCache,
  link: uploadLink,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
