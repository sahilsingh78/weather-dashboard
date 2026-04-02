import axios from "axios";

export const getWeatherData = async (lat, lon) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,precipitation,visibility,uv_index,precipitation_probability&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset`;

  return (await axios.get(url)).data;
};

export const getAirQuality = async (lat, lon) => {
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&timezone=auto&hourly=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide`;

  return (await axios.get(url)).data;
};

export const getHistoricalData = async (lat, lon, start, end) => {
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&timezone=auto&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,precipitation_sum,windspeed_10m_max,winddirection_10m_dominant,sunrise,sunset`;

  return (await axios.get(url)).data;
};