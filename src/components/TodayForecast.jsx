
export function TodayForecast(props) {
    const { weather, error } = props;

    return (
        <>
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
        </>
    )
}

