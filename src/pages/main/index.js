import LocationCard from '../../components/LocationCard';
import MainCard from '../../components/Maincard';
import { Box, Typography, TextField, Autocomplete, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import Backdrop from "@mui/material/Backdrop";
import WeatherAreaChart from '../../components/ChartsSection';

function MainIndex() {
  /* eslint-disable */
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);


  const payload = [{
    location:"Colombo",
    currentDate: "12-6-2025",
    humidity: "10",
    temperature: "10",
    wind: "10",
    type: "sunny",
    pastDays: [
      { date: "8-6-2025", humidity: "10", temperature: "10", wind: "10", type: "windy" },
      { date: "9-6-2025", humidity: "10", temperature: "10", wind: "10", type: "windy" },
      { date: "10-6-2025", humidity: "10", temperature: "10", wind: "10", type: "windy" },
      { date: "11-6-2025", humidity: "10", temperature: "10", wind: "10", type: "windy" },
      { date: "12-6-2025", humidity: "10", temperature: "10", wind: "10", type: "windy" },
    ],
    nextDays: [
      { date: "13-6-2025", humidity: "10", temperature: "10", wind: "10", type: "windy" },
      { date: "14-6-2025", humidity: "10", temperature: "10", wind: "10", type: "windy" },
      { date: "15-6-2025", humidity: "10", temperature: "10", wind: "10", type: "windy" },
    ]
  }];
  // let data= payload[0];


  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Colombo, Sri Lanka');
  

  // Fetch location suggestions
  useEffect(() => {
    if (inputValue.length < 3) {
      setOptions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputValue)}`
        );
        const result = await res.json();
        const newOptions = result.map((item) => ({
          label: item.display_name,
          lat: item.lat,
          lon: item.lon,
        }));
        setOptions(newOptions);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);
 

  return (
    <>
    {loadingBackdrop && (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loadingBackdrop}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
      )}
    
   <Box sx={{ padding: 2 }}>
  <Autocomplete
    freeSolo
    loading={loading}
    options={options}
    onInputChange={(e, value) => setInputValue(value)}
    onChange={(e, value) => {
      if (value) {
        setSelectedLocation(value.label);
        console.log('Selected Location:', value.label);
      }
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search Location"
        variant="outlined"
        fullWidth
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px', // 🎯 round the corners here
          },
        }}
        InputProps={{
          ...params.InputProps,
          endAdornment: (
            <>
              {loading && <CircularProgress size={20} />}
              {params.InputProps.endAdornment}
            </>
          ),
        }}
      />
    )}
  />
</Box>


    <Box
      sx={{
        display: 'flex',
        flexWrap: { xs: 'wrap', md: 'nowrap' }, // Wrap on small, row on medium+
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          flex: '1 1 100%',
          boxSizing: 'border-box',
          padding: '0 8px',
          minWidth: 0,
          maxWidth: { xs: '100%', md: '50%' }, // Full on small, half on md+
        }}
        className="main-card-wrapper"
      >
        <MainCard
          location="Colombo, Sri Lanka"
          maintemp={31}
          weatherStatus="Partly Cloudy"
          htemp={33}
          ltemp={27}
          filename={"snowy-3-day.svg"}
        />
      </Box>

      <Box
        sx={{
          flex: '1 1 100%',
          boxSizing: 'border-box',
          padding: '0 8px',
          marginTop: { xs: 2, md: 0 }, // Add margin-top only on small screens
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: { xs: '100%', md: '50%' },
          marginTop:"14px"
        }}
        className="main-card-wrapper"
      >
        <Typography variant="body" sx={{ fontWeight: 500, fontSize: '20px', marginBottom: 1, marginLeft:'15px' }}>
          Weekly
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: 1,
          }}
        >
          {[...Array(8)].map((_, index) => (
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

        

        
        
      </Box>
    </Box>

    <Typography variant="body" sx={{ fontWeight: 500, fontSize: '20px', marginBottom: 1, marginLeft:'15px', marginTop: "10px"}}>
          Weather trends
      </Typography>

     <Box
      sx={{
        marginTop: "10px",
        display: 'flex',
        flexWrap: { xs: 'wrap', md: 'nowrap' }, // Wrap on small, row on medium+
        width: '100%',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
      }}
    >

      
      <WeatherAreaChart />
    </Box>

    </>
    
  );
}

export default MainIndex;