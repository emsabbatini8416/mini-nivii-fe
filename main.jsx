import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function App() {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const ask = async () => {
    try {
      const res = await axios.post("http://localhost:8000/ask", { question });
      const { columns, rows } = res.data.data;
      const chartData = rows.map((r) =>
        Object.fromEntries(columns.map((col, i) => [col, r[i]]))
      );
      setData(chartData);
      setError("");
    } catch (err) {
      setError("⚠️ Could not process question.");
      setData(null);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Mini Nivii</h1>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question like: top-selling product in October"
        style={{ width: "80%", padding: "8px" }}
      />
      <button onClick={ask} style={{ marginLeft: 10, padding: "8px" }}>
        Ask
      </button>
      {error && <p>{error}</p>}
      {data && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey={Object.keys(data[0])[0]} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={Object.keys(data[0])[1]} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
