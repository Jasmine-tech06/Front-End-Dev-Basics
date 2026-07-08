import "../styles/dashboardHeader.css";

function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="dashboard-header-card">

      <div>

        <h1>{greeting} 👋</h1>

        <p>
          Welcome back!
          Manage your employees efficiently.
        </p>

      </div>

      <button className="export-btn">

        Export Report

      </button>

    </div>
  );
}

export default DashboardHeader;