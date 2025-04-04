import React, { useState, useEffect } from "react";
import "./App.css"; // Import your custom styles

const App = () => {
  const [city, setCity] = useState("Lahore"); // Set default city to Lahore
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  // Fetch weather when the app loads or city changes
  const fetchWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=024c6864c16a62b52cf5ccf74ca28e19&units=metric`
      );
      const data = await response.json();
      // console.log(data, "hello");

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setError("City not found!");
        setWeather(null);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  // Fetch the weather data for Lahore when the app loads
  useEffect(() => {
    fetchWeather();
  }, []); // Empty array ensures this runs only once when the component mounts

  // Handle the button click to fetch weather for the typed city
  const handleButtonClick = () => {
    fetchWeather();
  };

  // Function to get background style based on temperature
  const getBackgroundStyle = (temperature) => {
    if (temperature < 10) {
      // Cold background
      return "linear-gradient(to top, #74ebd5 0%, #9face6 100%)"; // Blue icy background
    } else if (temperature >= 10 && temperature <= 25) {
      // Mild background
      return "linear-gradient(to top, #ff7e5f 0%, #feb47b 100%)"; // Orange/yellow background
    } else {
      // Hot background
      return "linear-gradient(to top, #ff5f6d 0%, #ffc3a0 100%)"; // Red warm background
    }
  };

  return (
    <div
      className="weather-app"
      style={{
        background: weather ? getBackgroundStyle(weather.main.temp) : "#74ebd5", // Default blue background
        height: "100vh",
        width: "100%",
        display: "flex",
        boxSizing: "border-box",
        justifyContent: "center",
        alignItems: "center",
        transition: "background 1s ease-in-out", // Smooth transition for background change
      }}
    >
      <div className="weather-container">
        <h1>Weather Application</h1>
        <div className="search-container">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)} // Update city as the user types
            placeholder="Enter city name"
          />
          <button onClick={handleButtonClick}>Get Weather</button>
        </div>

        {error && <div className="error">{error}</div>}

        {weather && (
          <div className="weather-details">
            <h2>{weather.name}</h2>
            <p>{weather.weather[0].description}</p>
            <p>
              <strong>Temperature:</strong> {weather.main.temp}°C
            </p>
            <p>
              <strong>Humidity:</strong> {weather.main.humidity}%
            </p>
            <p>
              <strong>Wind Speed:</strong> {weather.wind.speed} m/s
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
