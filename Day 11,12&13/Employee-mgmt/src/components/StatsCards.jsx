import {
    FaUsers,
    FaBuilding,
    FaEnvelope,
    FaUserCheck
} from "react-icons/fa";

import "../styles/statsCards.css";

function StatsCards({ employees }) {

    const departments = [
        ...new Set(
            employees.map(emp => emp.department)
        )
    ];

    const cards = [

        {
            title: "Employees",
            value: employees.length,
            icon: <FaUsers />
        },

        {
            title: "Departments",
            value: departments.length,
            icon: <FaBuilding />
        },

        {
            title: "Emails",
            value: employees.length,
            icon: <FaEnvelope />
        },

        {
            title: "Active",
            value: employees.length,
            icon: <FaUserCheck />
        }

    ];

    return (

        <div className="stats">

            {

                cards.map((card, index) => (

                    <div
                        className="stat-card"
                        key={index}
                    >

                        <div className="stat-icon">

                            {card.icon}

                        </div>

                        <div>

                            <h2>{card.value}</h2>

                            <p>{card.title}</p>

                        </div>

                    </div>

                ))

            }

        </div>

    )

}

export default StatsCards;