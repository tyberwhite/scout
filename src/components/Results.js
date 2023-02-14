import React, { useState } from "react";
import Search from "./Search";

const API_KEY = process.env.REACT_APP_API_KEY;

async function getGeolocation(apiKey, ip) {
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

function Results({ data }) {
  return (
    <div className="results">
      {data && (
        <div>
          <h2 id="ip-address">{data.ip}</h2>
          <p>
            <span>ISP: </span>
            {data.isp}
          </p>
          <p id="country-name">
            <span>Country Name: </span>
            {data.country_name}
          </p>
          <p>
            <span>State: </span>
            {data.state_prov}
          </p>
          <p>
            <span>City: </span>
            {data.city}
          </p>
          <p>
            <span>Zipcode: </span>
            {data.zipcode}
          </p>
          <p>
            <span>Latitude: </span>
            {data.latitude}
          </p>
          <p>
            <span>Longitude: </span>
            {data.longitude}
          </p>
          <p>
            <span>Current Time: </span>
            {data.time_zone.current_time}
          </p>
          <p></p>
        </div>
      )}
    </div>
  );
}

function MyComponent() {
  const [geolocationData, setGeolocationData] = useState(null);

  const handleSubmit = async (ipAddress) => {
    const data = await getGeolocation(API_KEY, ipAddress);
    setGeolocationData(data);
  };

  return (
    <div className="results-content-container">
      <Search onSubmit={handleSubmit} />
      <div className="results-container">
        <Results data={geolocationData} />
      </div>
    </div>
  );
}

export default MyComponent;
