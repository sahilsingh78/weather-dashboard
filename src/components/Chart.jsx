import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Brush, // 🔥 added
} from "recharts";

function Chart({ data, title, keys }) {
  if (!data || data.length === 0) return null;

  return (
    <div
      style={{
        marginTop: "30px",
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px", color: "#fff" }}>
        {title}
      </h3>

      {/* 🔥 Scroll + fixed height */}
      <div style={{ width: "100%", height: "300px", overflowX: "auto" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="time"
              stroke="#94a3b8"
              tick={{ fontSize: 12 }}
            />

            <YAxis stroke="#94a3b8" />

            <Tooltip />
            <Legend />

            {keys.map((k, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={k.key}
                stroke={k.color}
                strokeWidth={2}
                dot={false}
              />
            ))}

            {/* 🔥 KEY FEATURE: Zoom + range selection */}
            <Brush
              dataKey="time"
              height={30}
              stroke="#38bdf8"
              travellerWidth={10}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Chart;