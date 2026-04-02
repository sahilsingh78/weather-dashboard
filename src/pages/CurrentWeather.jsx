import { useEffect, useState } from "react";
import { getWeatherData, getAirQuality } from "../services/api";
import WeatherCard from "../components/WeatherCard";
import Chart from "../components/Chart";

import {
  convertTemp,
  formatTime,
  calculateAQI,
  formatRain,
  formatUV,
} from "../utils/helpers";

function Section({ title, children }) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [daily, setDaily] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [pmChart, setPmChart] = useState([]);
  const [unit, setUnit] = useState("C");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchData(pos.coords.latitude, pos.coords.longitude);
    });
  }, []);

  const fetchData = async (lat, lon) => {
    const w = await getWeatherData(lat, lon);
    const a = await getAirQuality(lat, lon);

    setWeather(w.current_weather);
    setDaily(w.daily);

    const hourlyData = w.hourly.time.map((t, i) => ({
      rawTime: t,
      time: formatTime(t),
      temperature: w.hourly.temperature_2m[i],
      humidity: w.hourly.relativehumidity_2m[i],
      wind: w.hourly.windspeed_10m[i],
      precipitation: w.hourly.precipitation[i],
      visibility: w.hourly.visibility[i],
      uv: w.hourly.uv_index[i],
      rainProb: w.hourly.precipitation_probability[i],
    })).slice(0, 24);

    setHourly(hourlyData);

    const pmData = a.hourly.time.map((t, i) => ({
      time: formatTime(t),
      pm10: a.hourly.pm10[i],
      pm25: a.hourly.pm2_5[i],
    })).slice(0, 24);

    setPmChart(pmData);
  };

  const currentData = hourly[0];

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto", color: "#fff" }}>
      <h2 style={{ textAlign: "center" }}>Weather Dashboard 🌤️</h2>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
          Toggle °C / °F
        </button>
      </div>

      {weather && daily && currentData && (
        <>
          <Section title="Temperature">
            <WeatherCard title="Current" value={`${convertTemp(weather.temperature, unit).toFixed(1)}°${unit}`} />
            <WeatherCard title="Max" value={`${convertTemp(daily.temperature_2m_max[0], unit).toFixed(1)}°${unit}`} />
            <WeatherCard title="Min" value={`${convertTemp(daily.temperature_2m_min[0], unit).toFixed(1)}°${unit}`} />
          </Section>

          <Section title="Atmospheric Conditions">
            <WeatherCard title="Humidity" value={`${currentData.humidity}%`} />
            <WeatherCard title="Precipitation" value={`${currentData.precipitation} mm`} />
            <WeatherCard title="UV Index" value={formatUV(currentData.uv)} />
            <WeatherCard title="Rain Probability" value={formatRain(currentData.rainProb)} />
          </Section>

          <Section title="Sun Cycle">
            <WeatherCard title="Sunrise" value={formatTime(daily.sunrise[0])} />
            <WeatherCard title="Sunset" value={formatTime(daily.sunset[0])} />
          </Section>

          <Section title="Wind & Air">
            <WeatherCard title="Wind Speed" value={`${currentData.wind} km/h`} />
            <WeatherCard title="Visibility" value={`${(currentData.visibility / 1000).toFixed(1)} km`} />
          </Section>

          <Section title="Air Quality">
            <WeatherCard title="PM10" value={pmChart[0]?.pm10 ?? "-"} />
            <WeatherCard title="PM2.5" value={pmChart[0]?.pm25 ?? "-"} />
            <WeatherCard title="AQI" value={calculateAQI(pmChart[0]?.pm25)} />
            <WeatherCard title="CO2" value="~400 ppm" />
          </Section>

          <Chart data={hourly} title="Temperature (°C)" keys={[{ key: "temperature", color: "#38bdf8" }]} />
          <Chart data={hourly} title="Humidity (%)" keys={[{ key: "humidity", color: "#22c55e" }]} />
          <Chart data={hourly} title="Wind Speed (km/h)" keys={[{ key: "wind", color: "#f97316" }]} />
          <Chart data={hourly} title="Precipitation (mm)" keys={[{ key: "precipitation", color: "#6366f1" }]} />
          <Chart data={hourly} title="Visibility (km)" keys={[{ key: "visibility", color: "#a855f7" }]} />
          <Chart data={hourly} title="UV Index" keys={[{ key: "uv", color: "#facc15" }]} />
          <Chart data={hourly} title="Rain Probability (%)" keys={[{ key: "rainProb", color: "#60a5fa" }]} />

          <Chart data={pmChart} title="PM10 & PM2.5 (µg/m³)" keys={[
            { key: "pm10", color: "#f97316" },
            { key: "pm25", color: "#22c55e" }
          ]} />
        </>
      )}
    </div>
  );
}

export default CurrentWeather;