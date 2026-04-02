function WeatherCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "16px",
        borderRadius: "14px",
        width: "140px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      <p style={{ color: "#94a3b8", fontSize: "13px" }}>{title}</p>
      <h3 style={{ margin: "5px 0" }}>{value}</h3>
    </div>
  );
}

export default WeatherCard;