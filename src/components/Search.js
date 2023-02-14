import React, { useState, useEffect } from "react";

function Search({ onSubmit }) {
  const [ipAddress, setIpAddress] = useState("");
  const [isValidIp, setIsValidIp] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false); // new state variable

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
    setButtonClicked(true); // set buttonClicked to true when search button is clicked
  };

  const handleMyIpClick = (event) => {
    event.preventDefault();
    setIpAddress(ipAddress);
    onSubmit(ipAddress);
  };

  const handleInputChange = (event) => {
    const inputIp = event.target.value;
    setIsValidIp(isValidIPAddress(inputIp));
    setIpAddress(inputIp);
    setButtonClicked(false); // reset buttonClicked when input is changed
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
          onChange={handleInputChange}
        />

        <button type="submit" id="search-box-btn" disabled={!isValidIp}>
          Search
        </button>
        <button type="submit" id="my-ip-btn" onClick={handleMyIpClick}>
          Use My IP
        </button>
      </form>
      {buttonClicked && !isValidIp && (
        <div className="error-message">You must enter a valid IP address</div>
      )}
    </div>
  );
}

function isValidIPAddress(ipAddress) {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipRegex.test(ipAddress);
}

export default Search;
