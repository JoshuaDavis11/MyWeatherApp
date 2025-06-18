import { useEffect, useState } from 'react';
import { TodayForecast } from './components/TodayForecast';

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
          `http://localhost:5000/api/weather?lat=${location.latitude}&lon=${location.longitude}`
        );
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError('Failed to fetch weather data. Error: ' + err);
      }
    };

    fetchWeather();
  }, [location]); 


  
  return (
    <div>
      <TodayForecast weather={weather} error={error}/>
    </div>
  );
}

export default App;
