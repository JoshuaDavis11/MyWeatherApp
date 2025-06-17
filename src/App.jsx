import { useEffect, useState } from 'react';

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const error = (err) => {
      console.error('Error getting location:', err);
      setError('Could not get location.');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

 
  useEffect(() => {
    if (!location) return;
    
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${location.latitude},${location.longitude}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data.' + err);
      }
    };

    fetchWeather();
  }, [location]); 

  return (
    <div>
      <h1>Weather App</h1>

      {error && <p>{error}</p>}

      {!location && !error && <p>Getting your location...</p>}

      {location && !weather && <p>Fetching weather data...</p>}

      {weather && (
        <div>
          <p>
            Location: {weather.location.name}, {weather.location.country}
          </p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default App;
