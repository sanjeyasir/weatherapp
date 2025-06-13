import React, { useState } from 'react';
import WeatherCard from '../../components/Weathercard';
import MainCard from '../../components/Maincard';


function MainIndex() {

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
  let data= payload[0];
 

  return (
    <>

    <div style={{margin:'10px'}}>
      sth
    </div>

    <MainCard
        location={data.location}
        currentdate={data.currentDate}
        type={data.type}
        temperature={data.temperature}
        humidity={data.humidity}
        wind={data.wind}
        filename={"snowy-3-day.svg"}
    />

    {/* {data.pastDays.map((day, i) => (
      <WeatherCard
        key={i}
        date={day.date}
        type={day.type}
        temperature={day.temperature}
        humidity={day.humidity}
        wind={day.wind}
      />
    ))}
     */}

    

    </>
    
  );
}

export default MainIndex;