import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import { motion } from "framer-motion";

import "../styles/AnalyticsChart.css";

function AnalyticsChart({ employees }) {

  const departmentCount = {};

  employees.forEach((employee) => {
    departmentCount[employee.department] =
      (departmentCount[employee.department] || 0) + 1;
  });

  const data = Object.keys(departmentCount).map((dept) => ({
    name: dept,
    value: departmentCount[dept],
  }));

  const COLORS = [
    "#4f46e5",
    "#2563eb",
    "#06b6d4",
    "#22c55e",
    "#f97316",
    "#ec4899",
    "#facc15",
    "#8b5cf6",
    "#14b8a6",
    "#ef4444",
  ];

  return (
    <motion.div
      className="analytics-container"
      initial={{ opacity:0,y:40 }}
      animate={{ opacity:1,y:0 }}
      transition={{ duration:.6 }}
    >

      <div className="chart-card">

        <h2>Department Distribution</h2>

        <ResponsiveContainer width="100%" height={430}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={0}
              outerRadius={120}
              paddingAngle={2}
              label
            >

              {data.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={COLORS[index%COLORS.length]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              align="center"
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>Employees by Department</h2>

        <ResponsiveContainer width="100%" height={430}>

          <BarChart data={data}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="name"/>

            <YAxis allowDecimals={false}/>

            <Tooltip/>

            <Legend/>

            <Bar
              dataKey="value"
              fill="#2563eb"
              radius={[8,8,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}

export default AnalyticsChart;