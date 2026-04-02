function WeatherCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "15px",
        borderRadius: "12px",
        width: "140px",
        textAlign: "center",
      }}
    >
      <p style={{ color: "#94a3b8", fontSize: "14px" }}>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}

export default WeatherCard;