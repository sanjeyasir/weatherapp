import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const handleSearch = () => {
    // This is just placeholder logic.
    setWeather({
      city: city,
      temperature: '30°C',
      description: 'Sunny',
    });
  };

  const payload = [{
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
  let data= payload[0];

  return (
    <>
    

     <div className="weather-container">
      <h1>Weather Overview</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {weather && (
        <div className="weather-card">
          <h2>{weather.city}</h2>
          <p>{weather.temperature}</p>
          <p>{weather.description}</p>
        </div>
      )}

      <section className="current-weather">
        <h2>Today - {data.currentDate}</h2>
        <p><strong>Type:</strong> {data.type}</p>
        <p><strong>Temp:</strong> {data.temperature}°C</p>
        <p><strong>Humidity:</strong> {data.humidity}%</p>
        <p><strong>Wind:</strong> {data.wind} km/h</p>

         <section>
        <h3>Past 5 Days</h3>
        <div className="scroll-row">
          {data.pastDays.map((day, i) => (
            <div key={i} className="weather-card">
              <p><strong>{day.date}</strong></p>
              <p>{day.type}</p>
              <p>{day.temperature}°C</p>
              <p>{day.humidity}% Humidity</p>
              <p>{day.wind} km/h Wind</p>
            </div>
          ))}
        </div>
      </section>
      </section>

     

      <section>
        <h3>Next 3 Days</h3>
        <div className="scroll-row">
          {data.nextDays.map((day, i) => (
            <div key={i} className="weather-card">
              <p><strong>{day.date}</strong></p>
              <p>{day.type}</p>
              <p>{day.temperature}°C</p>
              <p>{day.humidity}% Humidity</p>
              <p>{day.wind} km/h Wind</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
    
  );
}

export default App;