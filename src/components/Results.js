import React, { useState } from "react";
import Search from "./Search";

const API_KEY = "ef74ae90c8c94008b2052e5556476a74";

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
