import LocationCard from '../../components/LocationCard';
import MainCard from '../../components/Maincard';
import { Box, Typography, TextField, Autocomplete, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import Backdrop from "@mui/material/Backdrop";
import WeatherAreaChart from '../../components/ChartsSection';

function MainIndex() {
  /* eslint-disable */
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);

  const apiKey=process.env.REACT_APP_API_KEY_OPEN_WEATHER
  const apiKey_geoCage=process.env.REACT_APP_API_KEY_GEOCAGE



  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Colombo, Sri Lanka');
  const [selectedLng, setSelectedLocationLong] = useState('');
  const [selectedLat, setSelectedLocationLat] = useState('');

  const [mainCardWeatherData, setMainCardWeatherData] = useState(null);
  const [forecastWeatherData, setForecastWeatherData] = useState([]);
  const [trendData, setTrendData] = useState([]);

  //geocade api to get values
  useEffect(() => {
    if (inputValue.length < 3) {
      setOptions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(inputValue)}&key=${apiKey_geoCage}&limit=5`
        );
        const result = await res.json();

        // Map to your options format
        const newOptions = result.results.map(item => ({
          label: item.formatted,
          lat: item.geometry.lat,
          lon: item.geometry.lng,
        }));

        setOptions(newOptions);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

 
  // function: getting data for current location
  const fetchCurrentLocationWeather = async (apiKey) => {
    return new Promise((resolve, reject) => {
      // Step 1: Get user's current location
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Step 2: Fetch weather using lat/lon
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            resolve(data);
          } catch (err) {
            reject(err);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  // forecast and past days data for current location
  async function fetchForecastByGeolocation(apiKey) {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by this browser.");
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
            );

            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            resolve(data);
          } catch (err) {
            reject(err);
          }
        },
        (error) => {
          reject(new Error("Failed to get geolocation: " + error.message));
        }
      );
    });
  }
 
 // Enhanced helper function to get appropriate weather icon filename
  const getWeatherIconFilename = (weatherType) => {
    const type = weatherType.toLowerCase();

    if (["clouds", "overcast", "few clouds", "scattered clouds", "broken clouds"].includes(type)) {
      return "cloudy-3-day.svg";
    }
    if (["rain", "drizzle", "shower rain", "light rain", "moderate rain", "heavy intensity rain"].includes(type)) {
      return "rainy-3-day.svg";
    }
    if (["clear", "sunny"].includes(type)) {
      return "sunny-3-day.svg";
    }
    if (["snow", "light snow", "heavy snow"].includes(type)) {
      return "snowy-3-day.svg";
    }
    if (["thunderstorm", "storm"].includes(type)) {
      return "thunder-3-day.svg"; // Assuming you have this icon
    }
    if (["mist", "smoke", "haze", "fog", "dust", "sand", "ash", "squall", "tornado"].includes(type)) {
      return "mist-3-day.svg"; // Assuming you have this icon
    }

    // Default fallback icon
    return "cloudy-3-day.svg";
  };


  useEffect(() => {
    const fetchWeatherOnMount = async () => {
      try {
        setLoadingBackdrop(true);
        const data = await fetchCurrentLocationWeather(apiKey);

       
        
        setMainCardWeatherData({
          location: data.name + ", " + data.sys.country,
          maintemp: Math.round(data.main.temp),
          weatherStatus: data.weather[0].main,
          htemp: Math.round(data.main.temp_max),
          ltemp: Math.round(data.main.temp_min),
          filename: getWeatherIconFilename(data.weather[0].main), // helper to pick icon
        });
        const dataSpan = await fetchForecastByGeolocation(apiKey);
        console.log("=====> weather", dataSpan);
        
        // Extract daily forecasts (pick the forecast for 12:00:00 each day)
        const dailyForecasts = [];
        const seenDates = new Set();
        const dailyAggregates = [];

        dataSpan.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0]; // yyyy-mm-dd
          const time = item.dt_txt.split(" ")[1]; // hh:mm:ss

          if (time === "12:00:00" && !seenDates.has(date)) {
            seenDates.add(date);
            dailyForecasts.push(item);
            dailyAggregates.push({
              date: date,
              temperature: item.main.temp,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              wind_speed: item.wind.speed,
            });
          }
        });

        setForecastWeatherData(dailyForecasts);
        setTrendData(dailyAggregates);
        
       
      } catch (err) {
        console.error("Error fetching current location weather:", err);
      }
      finally{
        setLoadingBackdrop(false);
      }
    };

    fetchWeatherOnMount();
  }, []);


  async function fetchWeatherByCityName(lat,long, apiKey) {
  try {
    if(!lat || !long) throw new Error(`Error: No valid data`);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
   } catch (err) {
    throw err;
  }
 }

  async function fetchForecastByCityName(lat,long, apiKey) {
    try {
      if(!lat || !long) throw new Error(`Error: No valid data`);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      return await response.json();
    } catch (err) {
      throw err;
    }
  }


  useEffect(() => {
    async function fetchData() {
      try {
        setLoadingBackdrop(true);
        const data = await fetchWeatherByCityName(selectedLat,selectedLng, apiKey);

        setMainCardWeatherData({
          location: data.name + ", " + data.sys.country,
          maintemp: Math.round(data.main.temp),
          weatherStatus: data.weather[0].main,
          htemp: Math.round(data.main.temp_max),
          ltemp: Math.round(data.main.temp_min),
          filename: getWeatherIconFilename(data.weather[0].main), // helper to pick icon
        });
        const dataSpan = await fetchForecastByCityName(selectedLat,selectedLng, apiKey);
        
        // Extract daily forecasts (pick the forecast for 12:00:00 each day)
        const dailyForecasts = [];
        const seenDates = new Set();
        const dailyAggregates = [];

        dataSpan.list.forEach((item) => {
          const date = item.dt_txt.split(" ")[0]; // yyyy-mm-dd
          const time = item.dt_txt.split(" ")[1]; // hh:mm:ss

          if (time === "12:00:00" && !seenDates.has(date)) {
            seenDates.add(date);
            dailyForecasts.push(item);
            dailyAggregates.push({
              date: date,
              temperature: item.main.temp,
              humidity: item.main.humidity,
              pressure: item.main.pressure,
              wind_speed: item.wind.speed,
            });
          }
        });

        setForecastWeatherData(dailyForecasts);
        setTrendData(dailyAggregates);
        

      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
      finally{
        setLoadingBackdrop(false);
      }
    }

  fetchData();
  }, [selectedLat,selectedLng]);




 

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
        setSelectedLocationLat(value.lat);
        setSelectedLocationLong(value.lon);
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
            borderRadius: '20px',
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
        {mainCardWeatherData && (
          <MainCard
            location={mainCardWeatherData.location}
            maintemp={mainCardWeatherData.maintemp}
            weatherStatus={mainCardWeatherData.weatherStatus}
            htemp={mainCardWeatherData.htemp}
            ltemp={mainCardWeatherData.ltemp}
            filename={mainCardWeatherData.filename}
          />
        )}
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
        {forecastWeatherData.length!=0 && <Typography variant="body" sx={{ fontWeight: 500, fontSize: '20px', marginBottom: 1, marginLeft:'15px' }}>
          Next five days
        </Typography>}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            paddingBottom: 1,
            maxHeight:'200px',
            overflowY:'auto'
          }}
        >
         {forecastWeatherData && forecastWeatherData.map((forecast, index) => (
          <LocationCard
            key={index}
            maintemp={Math.round(forecast.main.temp)}
            weatherStatus={forecast.weather[0].main}
            htemp={Math.round(forecast.main.temp_max)}
            ltemp={Math.round(forecast.main.temp_min)}
            filename={getWeatherIconFilename(forecast.weather[0].main)} // assuming you have icons named by icon code
            date={forecast.dt_txt.split(" ")[0]}
          />
        ))}
        </Box>

        

        
        
      </Box>
    </Box>

  

    {trendData.length!=0 &&<Box
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

       <WeatherAreaChart data={trendData} />
      
    </Box>}

    </>
    
  );
}

export default MainIndex;