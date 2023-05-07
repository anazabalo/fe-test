import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Movies from './components/movies';
import Container from '@mui/material/Container';

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Container>
      <Movies />
    </Container>
  </ApolloProvider>,
);
