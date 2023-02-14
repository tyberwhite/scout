import React, { useState, useEffect } from "react";

function isValidIPAddress(ipAddress) {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipRegex.test(ipAddress);
}

function Search({ onSubmit }) {
  const [ipAddress, setIpAddress] = useState("");
  const [isValidIp, setIsValidIp] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

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
    setButtonClicked(true);
    if (isValidIp) {
      onSubmit(ipAddress);
      setIpAddress("");
    }
  };

  const handleMyIpClick = (event) => {
    event.preventDefault();
    // Submit empty string so API defaults to users IP
    onSubmit("");
    setIpAddress("");
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
    </div>
  );
}

export default Search;
