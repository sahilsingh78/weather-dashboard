import { useState } from "react";
import { getHistoricalData, getAirQuality } from "../services/api";
import Chart from "../components/Chart";
import { getWindDirection } from "../utils/helpers";

function Historical() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [data, setData] = useState([]);
  const [pmData, setPmData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    if (!start || !end) {
      alert("Select date range");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    if (start > today || end > today) {
      alert("Future dates are not allowed");
      return;
    }

    const diff =
      (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);

    if (diff > 730) {
      alert("Maximum 2 years range allowed");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      try {
        setLoading(true);

        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        const res = await getHistoricalData(lat, lon, start, end);
        const air = await getAirQuality(lat, lon);

        console.log("API RESPONSE:", res); // DEBUG

        // 🔥 FIX 1: handle empty API response
        if (!res.daily || !res.daily.time) {
          alert("No historical data available for selected range");
          setLoading(false);
          return;
        }

        const formatted = res.daily.time.map((t, i) => ({
          time: t,
          max: res.daily.temperature_2m_max[i],
          min: res.daily.temperature_2m_min[i],
          mean: res.daily.temperature_2m_mean[i],
          precipitation: res.daily.precipitation_sum[i],
          wind: res.daily.windspeed_10m_max[i],
          direction: res.daily.winddirection_10m_dominant[i],
          sunrise: new Date(res.daily.sunrise[i]).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
          sunset: new Date(res.daily.sunset[i]).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          }),
        }));

        setData(formatted);

        // 🔥 FIX 2: format pmData properly
        const pm = air.hourly.time.map((t, i) => ({
          time: new Date(t).toLocaleDateString(),
          pm10: air.hourly.pm10[i],
          pm25: air.hourly.pm2_5[i],
        }));

        setPmData(pm.slice(0, 50));
        setLoading(false);
      } catch (err) {
        console.log(err);
        alert("Error fetching data");
        setLoading(false);
      }
    });
  };

  const dominantDirection =
    data.length > 0 ? getWindDirection(data[0].direction) : "-";

  return (
    <div style={{ padding: "20px", maxWidth: "1100px", margin: "0 auto", color: "#fff" }}>
      <h2 style={{ textAlign: "center" }}>Historical Analysis 📊</h2>

      <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
        <input
          type="date"
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          type="date"
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button onClick={fetchData}>Analyze</button>
      </div>

      {/* 🔥 FIX 3: loading state */}
      {loading && (
        <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>
      )}

      {/* 🔥 FIX 4: fallback UI */}
      {!loading && data.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "30px" }}>
          No data found. Please select past dates.
        </p>
      )}

      {!loading && data.length > 0 && (
        <>
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
              Sun Cycle
            </h3>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
              {data.slice(0, 6).map((d, i) => (
                <div
                  key={i}
                  style={{
                    background: "#1e293b",
                    padding: "15px",
                    borderRadius: "10px",
                    width: "140px",
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                    {d.time}
                  </p>
                  <p>🌅 {d.sunrise}</p>
                  <p>🌇 {d.sunset}</p>
                </div>
              ))}
            </div>
          </div>

          <Chart
            data={data}
            title="Temperature (°C) (Min / Max / Mean)"
            keys={[
              { key: "min", color: "#22c55e" },
              { key: "max", color: "#f97316" },
              { key: "mean", color: "#38bdf8" },
            ]}
          />

          <Chart
            data={data}
            title="Total Precipitation (mm)"
            keys={[{ key: "precipitation", color: "#6366f1" }]}
          />

          <Chart
            data={data}
            title="Wind Speed (km/h)"
            keys={[{ key: "wind", color: "#facc15" }]}
          />

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <h3>Dominant Wind Direction</h3>
            <div
              style={{
                marginTop: "10px",
                display: "inline-block",
                padding: "15px 25px",
                background: "#1e293b",
                borderRadius: "12px",
                fontSize: "18px",
              }}
            >
              🧭 {dominantDirection}
            </div>
          </div>

          <Chart
            data={pmData}
            title="PM10 & PM2.5 (µg/m³)"
            keys={[
              { key: "pm10", color: "#f97316" },
              { key: "pm25", color: "#22c55e" },
            ]}
          />
        </>
      )}
    </div>
  );
}

export default Historical;