import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Movies from './components/movies';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 50,
      fontWeight: 600,
    },

    h2: {
      fontSize: 40,
      fontWeight: 500,
    },

    h4: {
      fontSize: 30,
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: 20,
      fontWeight: 400,
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#FEE356',
    },
  },
});

const client = new ApolloClient({
  uri: process.env.API_URL,
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Container>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Movies />
        </CssBaseline>
      </ThemeProvider>
    </Container>
  </ApolloProvider>,
);
