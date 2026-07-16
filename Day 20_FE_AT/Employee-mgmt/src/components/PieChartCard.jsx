import { motion } from "framer-motion";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import { FaChartPie } from "react-icons/fa";

import "../styles/PieChartCard.css";

function PieChartCard({ employees }) {

    const departmentCount = {};

    employees.forEach(emp=>{
        departmentCount[emp.department]=
        (departmentCount[emp.department]||0)+1;
    });

    const data=Object.keys(departmentCount).map(dept=>({

        name:dept,
        value:departmentCount[dept]

    }));

    const COLORS=[
        "#10b981",
        "#0ea5e9",
        "#8b5cf6",
        "#fbbf24",
        "#f43f5e",
        "#3b82f6",
    ];

    return(

        <motion.div
        className="pie-card"
        initial={{opacity:0,y:30}}
        animate={{opacity:1,y:0}}
        transition={{duration:.5}}
        >

            <div className="chart-header">

                <div>

                    <h3>
                        <FaChartPie/>
                        Department Distribution
                    </h3>

                    <p>
                        Employees across departments
                    </p>

                </div>

            </div>

            <div className="pie-wrapper">

                <ResponsiveContainer width="100%" height={260}>

                    <PieChart>

                        <Pie

                        data={data}

                        dataKey="value"

                        innerRadius={60}

                        outerRadius={90}

                        paddingAngle={4}

                        strokeWidth={3}

                        stroke="#0f172a"

                        animationDuration={900}

                        animationEasing="ease-out"

                        >

                        {

                            data.map((item,index)=>(

                                <Cell

                                key={index}

                                fill={COLORS[index%COLORS.length]}

                                />

                            ))

                        }

                        </Pie>

                        <Tooltip/>

                    </PieChart>

                </ResponsiveContainer>

                <div className="chart-center">

                    <h2>{employees.length}</h2>

                    <span>Employees</span>

                </div>

            </div>

            <div className="custom-legend">

                {

                    data.map((item,index)=>(

                        <div
                        key={index}
                        className="legend-row"
                        >

                            <div className="legend-left">

                                <span
                                className="legend-color"
                                style={{
                                    background:
                                    COLORS[index%COLORS.length]
                                }}
                                />

                                {item.name}

                            </div>

                            <strong>{item.value}</strong>

                        </div>

                    ))

                }

            </div>

        </motion.div>

    );

}

export default PieChartCard;