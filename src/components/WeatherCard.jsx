function WeatherCard({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "16px",
        borderRadius: "14px",
        width: "100%",
        maxWidth: "160px",
        minWidth: "120px",
        flex: "1 1 120px",
        textAlign: "center",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.5)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
      }}
    >
      <p
        style={{
          color: "#94a3b8",
          fontSize: "12px",
          marginBottom: "5px",
        }}
      >
        {title}
      </p>

      <h3
        style={{
          margin: "5px 0",
          fontSize: "18px",
          color: "#f1f5f9",
        }}
      >
        {value}
      </h3>
    </div>
  );
}

export default WeatherCard;