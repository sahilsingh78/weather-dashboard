export const convertTemp = (temp, unit) =>
  unit === "C" ? temp : (temp * 9) / 5 + 32;

export const formatTime = (time) =>
  new Date(time).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export const calculateAQI = (pm25) => {
  if (!pm25) return "-";
  if (pm25 <= 50) return "Good";
  if (pm25 <= 100) return "Moderate";
  if (pm25 <= 150) return "Unhealthy";
  return "Hazardous";
};

export const formatRain = (rain) =>
  rain > 0 ? `${rain}%` : "No Rain";

export const formatUV = (uv) => {
  if (uv > 7) return "High";
  if (uv > 3) return "Moderate";
  return "Low";
};

export const getWindDirection = (deg) => {
  if (!deg) return "-";
  if (deg < 45) return "North";
  if (deg < 90) return "North-East";
  if (deg < 135) return "East";
  if (deg < 180) return "South-East";
  if (deg < 225) return "South";
  if (deg < 270) return "South-West";
  if (deg < 315) return "West";
  return "North-West";
};