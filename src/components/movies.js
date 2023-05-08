import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { GET_ALL_FILMS } from '../graphql/queries';
import MovieInfo from './movieInfo';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    '&:hover': {
      color: '#000000',
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  // add transition properties
  '&:hover': {
    transition: 'background-color 0.7s ease-in-out',
    cursor: 'pointer',
    backgroundColor: '#FEE356',
    '& > td': {
      color: '#000000',
    },
  },
  '&:focus': {
    transition: 'background-color 0.7s ease-in-out',
    cursor: 'pointer',
    backgroundColor: theme.palette.secondary,
    '& > td': {
      color: '#000000',
    },
  },
}));
function calculateAge(releaseDate) {
  const date = new Date(releaseDate);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const yearDiff = diff / (1000 * 60 * 60 * 24 * 365.25); // 365.25 days in a year to account for leap years
  return yearDiff.toFixed(0);
}
const Movies = () => {
  const [movieInfoModal, setMovieInfoModal] = useState(null);
  const { loading, error, data } = useQuery(GET_ALL_FILMS);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  const filmsWithAge = data.allFilms.films.map((film) => {
    const age = calculateAge(film.releaseDate);
    return { ...film, age };
  });

  return (
    <>
      <Box
        sx={{
          paddingY: 5,
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" color="secondary">
          Films
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <Typography variant="h4" component="h3">
                  Title
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4" component="h3">
                  Released
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4" component="h3">
                  Age
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography variant="h4" component="h3">
                  Director
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filmsWithAge.map((film) => (
              <StyledTableRow key={film.id}>
                <StyledTableCell onClick={() => setMovieInfoModal(film.id)}>
                  <Typography variant="h2" component="body1" sx={{ cursor: 'pointer' }}>
                    {film.title}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Typography variant="subtitle1" component="body1">
                    {film.releaseDate}
                  </Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Typography variant="subtitle1" component="body1">
                    {film.age} years
                  </Typography>
                </StyledTableCell>

                <StyledTableCell>
                  <Typography variant="subtitle1" component="body1">
                    {film.director}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {movieInfoModal && <MovieInfo id={movieInfoModal} close={() => setMovieInfoModal(null)} />}
    </>
  );
};

export default Movies;
