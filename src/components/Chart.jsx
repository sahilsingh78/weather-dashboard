import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";

function Chart({ data, title, keys }) {
  return (
    <div style={{ marginTop: "30px", background: "#1e293b", padding: "20px", borderRadius: "12px" }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>

      <div style={{ overflowX: "auto" }}>
        <div style={{ minWidth: data.length * 40, height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />

              {keys.map((k, i) => (
                <Line key={i} dataKey={k.key} stroke={k.color} dot={false} />
              ))}

              <Brush dataKey="time" height={20} stroke="#38bdf8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Chart;