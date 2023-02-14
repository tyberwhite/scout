import React, { useState } from "react";
import Search from "./Search";

const API_KEY = process.env.REACT_APP_API_KEY;
const key = process.env.REACT_APP_API_KEY;

async function getGeolocation(apiKey, ip) {
  const url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
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
          <p id="country-name">Country Name: {data.country_name}</p>
          <p>State: {data.state_prov}</p>
          <p>City: {data.city}</p>
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
