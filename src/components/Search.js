import React, { useState, useEffect } from "react";

function isValidIPAddress(ipAddress) {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipRegex.test(ipAddress);
}
let userip;

function Search({ onSubmit }) {
  const [ipAddress, setIpAddress] = useState("");
  const [isValidIp, setIsValidIp] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getUserIp = async () => {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      userip = data.ip;
      setIpAddress(data.ip);
    };
    getUserIp();
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    setButtonClicked(true);
    if (isValidIp) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        onSubmit(ipAddress);
        setIpAddress("");
      }, 2000);
    }
  };

  const handleMyIpClick = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSubmit("");
      setIpAddress("");
      console.log("userip: " + userip);
    }, 2000);
  };

  const handleInputChange = (event) => {
    const inputIp = event.target.value;
    setIsValidIp(isValidIPAddress(inputIp));
    setIpAddress(inputIp);
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

        <button type="submit" id="search-box-btn">
          Search
        </button>
        <button type="submit" id="my-ip-btn" onClick={handleMyIpClick}>
          Use My IP
        </button>
      </form>

      {buttonClicked && !isValidIp && (
        <div className="error-message">Please enter a valid IP address</div>
      )}

      {isLoading && <div className="loading-message">Loading...</div>}
    </div>
  );
}

export default Search;
