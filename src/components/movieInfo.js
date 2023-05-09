import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_FILM_INFO } from '../graphql/queries';
import { Modal, Box, Typography, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const MovieInfo = ({ id, close }) => {
  const [open, setOpen] = useState(true);
  const { loading, error, data } = useQuery(GET_FILM_INFO, {
    variables: {
      id,
    },
  });

  const handleClose = () => {
    setOpen(false);
    close();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error : {error.message}</p>;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 25,
          p: 10,
          minWidth: 400,
        }}
      >
        <Typography variant="h2" color="secondary" sx={{ mb: 2 }}>
          {data.film.title}
        </Typography>
        <Typography variant="subtitle2" sx={{ mb: 2, fontStyle: 'italic' }}>
          {data.film.openingCrawl}
        </Typography>
        <Typography variant="h2" color="secondary" sx={{ mb: 1 }}>
          Planets
        </Typography>

        {data.film.planetConnection.planets.map((planet) => (
          <Box key={planet.name}>
            <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
              {planet.name}
            </Typography>
          </Box>
        ))}

        <Box onClick={handleClose}>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
            sx={{ cursor: 'pointer' }}
          >
            <CloseIcon />
            <Typography
              variant="button"
              sx={{
                textAlign: 'right',
                mt: 2,
                fontWeight: 'bold',
              }}
              onClick={handleClose}
            >
              Close
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default MovieInfo;
