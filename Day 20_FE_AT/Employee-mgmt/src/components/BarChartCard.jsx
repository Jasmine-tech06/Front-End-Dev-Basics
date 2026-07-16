import { motion } from "framer-motion";
import "../styles/BarChartCard.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

function BarChartCard({ employees }) {
  const departmentCount = {};

  employees.forEach((employee) => {
    if (employee.department) {
      departmentCount[employee.department] =
        (departmentCount[employee.department] || 0) + 1;
    }
  });

  const data = Object.keys(departmentCount).map((dept) => ({
    name: dept,
    value: departmentCount[dept],
  }));

  const COLORS = [
    "#10b981",
    "#0ea5e9",
    "#8b5cf6",
    "#fbbf24",
    "#f43f5e",
    "#3b82f6",
  ];

  return (
    <motion.div
      className="chart-card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -4 }}
      style={{ background: "transparent", border: "none", boxShadow: "none", height: "100%", width: "100%" }}
    >
      <h2 style={{ fontSize: "16px", color: "white", textAlign: "left", marginBottom: "15px" }}>Employees by Department</h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(255,255,255,0.03)"
          />

          <XAxis
            dataKey="name"
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            allowDecimals={false}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(16,185,129,0.03)" }}
            contentStyle={{
              borderRadius: "8px",
              background: "#0d1527",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "white",
              fontSize: "12px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
            }}
          />

          <Bar
            dataKey="value"
            radius={[6, 6, 0, 0]}
            maxBarSize={35}
            animationDuration={900}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}

export default BarChartCard;