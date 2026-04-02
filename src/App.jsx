import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CurrentWeather from "./pages/CurrentWeather";
import Historical from "./pages/Historical";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          background: "#0f172a",
          padding: "15px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "#fff",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <h2 style={{ margin: 0 }}>🌤️ Weather App</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <Link to="/" style={navStyle}>Home</Link>
          <Link to="/history" style={navStyle}>Historical</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/history" element={<Historical />} />
      </Routes>
    </BrowserRouter>
  );
}

const navStyle = {
  color: "#cbd5f5",
  textDecoration: "none",
  fontSize: "14px",
};

export default App;