import { Card, Box, Typography } from '@mui/material';
import LocationCard from './LocationCard';

const ForecastSection = () => {
  return (
   <Card
  elevation={0}
  sx={{
    width: '100%',
    borderRadius: '16px',
    padding: 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(128, 128, 128, 0.1)', // transparent grey background
    border: '2px solid rgba(255, 255, 255, 0.8)', // white border with 80% opacity and 2px thickness
    color: '#333',
    margin: '5px',
  }}
>
  <Typography variant="body" sx={{ fontWeight: 500, fontSize: '20px' }}>
    Weekly
  </Typography>
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',
      width: '100%',       // Important: fill card width
      whiteSpace: 'nowrap', // Prevent wrapping of children
      paddingBottom: 1,
      marginTop: '10px',

      // Scrollbar styling
      '&::-webkit-scrollbar': { height: 6 },
      '&::-webkit-scrollbar-thumb': { backgroundColor: '#aaa', borderRadius: 3 },
      scrollbarWidth: 'thin',
      scrollbarColor: '#aaa transparent',
    }}
  >
    {[...Array(7)].map((_, index) => (
      <Box key={index} sx={{ flex: '0 0 auto', minWidth: 80, marginRight: 1 }}>
        <LocationCard
          maintemp={31 + index}
          weatherStatus="Partly Cloudy"
          htemp={33 + index}
          ltemp={27 + index}
          filename="snowy-3-day.svg"
          date={"2025-10-10"}
        />
      </Box>
    ))}
  </Box>
</Card>

  );
};

export default ForecastSection;

