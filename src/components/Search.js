import React, { useState, useEffect } from "react";

function Search({ onSubmit }) {
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    const getUserIp = async () => {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      setIpAddress(data.ip);
    };
    getUserIp();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    onSubmit(ipAddress);
    setIpAddress("");
  };

  const handleMyIpClick = (event) => {
    event.preventDefault();
    onSubmit(ipAddress);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleClick}>
        <input
          type="text"
          id="search-box-input"
          name="search-box-input"
          placeholder="Enter Valid IP Address... "
          required
          value={ipAddress}
          onChange={(event) => setIpAddress(event.target.value)}
        />
        <button type="submit" id="search-box-btn">
          Search
        </button>
        <button type="submit" id="my-ip-btn" onClick={handleMyIpClick}>
          Use My IP
        </button>
      </form>
    </div>
  );
}

export default Search;
