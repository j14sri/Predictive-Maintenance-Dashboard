import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [inputValues, setInputValues] = useState([65, 80, 90, 1]);
  const [weatherCondition, setWeatherCondition] = useState("Sunny");

  const inputLabels = [
    "Mileage Since Last Maintenance",
    "Engine Hours",
    "Average Speed",
    "Oil Quality Sensor",
  ];

  const currentAlerts = [
    { type: "warning", message: "Low Tire Pressure" },
    { type: "critical", message: "Battery Voltage Low" },
    { type: "warning", message: "Oil Change Due" },
  ];

  const handleChange = (index, value) => {
    const updated = [...inputValues];
    updated[index] = value === "" ? "" : parseFloat(value);
    setInputValues(updated);
  };

  const fetchPrediction = () => {
    const validInputs = inputValues.map((v) => parseFloat(v) || 0);

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features: validInputs }),
    })
      .then((res) => res.json())
      .then((data) => setPrediction(data.prediction))
      .catch((error) => console.error("API error:", error));
  };

  useEffect(() => {
    fetchPrediction();
  }, []);

  const getWeatherBackground = (condition) => {
    switch (condition) {
      case "Cloudy":
        return "#B3B3B3";
      case "Rainy":
        return "#4B8FB3";
      case "Snowy":
        return "#D6E9F1";
      case "Sunny":
        return "#FFD700";
      default:
        return "#6B7280";
    }
  };

  const renderWeatherIcon = (condition) => {
    switch (condition) {
      case "Sunny":
        return "☀️";
      case "Cloudy":
        return "☁️";
      case "Rainy":
        return "🌧️";
      case "Snowy":
        return "❄️";
      default:
        return "🌤️";
    }
  };

  // --- Chart Data ---
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Maintenance Prediction",
        data: [85, 75, 60, 50, 30],
        fill: false,
        borderColor: "#9333EA",
        tension: 0.4,
      },
    ],
  };

  const barData = {
    labels: ["Oil Pressure", "Tire Pressure", "Battery Health"],
    datasets: [
      {
        label: "Health Metrics",
        data: [70, 80, 90],
        backgroundColor: ["#3B82F6", "#60A5FA", "#1E40AF"],
        borderRadius: 10,
      },
    ],
  };

  const doughnutData = {
    labels: ["Healthy", "Needs Attention", "Critical"],
    datasets: [
      {
        label: "Car Health Status",
        data: [65, 25, 10],
        backgroundColor: ["#10B981", "#FBBF24", "#EF4444"],
      },
    ],
  };

  const failureHistoryData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Failure Events",
        data: [2, 3, 1, 4, 2],
        backgroundColor: "#EF4444",
        borderRadius: 10,
      },
    ],
  };

  const mileageData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Mileage Since Last Maintenance (km)",
        data: [1000, 2000, 1500, 2500],
        backgroundColor: "#34D399",
        borderRadius: 10,
      },
    ],
  };

  const engineHoursData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Engine Hours",
        data: [50, 60, 55, 65],
        backgroundColor: "#60A5FA",
        borderRadius: 10,
      },
    ],
  };

  const averageSpeedData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Average Speed (km/h)",
        data: [60, 65, 62, 70],
        backgroundColor: "#FBBF24",
        borderRadius: 10,
      },
    ],
  };

  const oilQualitySensorData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "Oil Quality Sensor",
        data: [90, 85, 80, 75],
        backgroundColor: "#F87171",
        borderRadius: 10,
      },
    ],
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleBar}>
        <h1 style={styles.titleText}>Predictive Maintenance Dashboard</h1>
      </div>

      <div style={styles.contentBox}>
        <div style={styles.sectionHeader}>
          <h1 style={styles.mainHeading}>Car Health Dashboard</h1>
          <p style={styles.subHeading}>
            Monitor your vehicle's performance and upcoming maintenance.
          </p>
        </div>

        <div style={styles.gridLayout}>
          <Card title="Overall Car Health">
            <Doughnut data={doughnutData} />
          </Card>

          <Card title="Component Metrics">
            <Bar data={barData} />
          </Card>

          <Card title="Maintenance Prediction">
            <Line data={lineData} />
          </Card>

          <Card title="Estimated Time Till Maintenance">
            <p style={styles.predictionText}>
              {prediction !== null ? `${prediction} days` : "Loading..."}
            </p>
          </Card>

          <Card title="Current Alerts">
            {currentAlerts.map((alert, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: alert.type === "critical" ? "#F87171" : "#FBBF24",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  marginBottom: "10px",
                  color: "#1F2937",
                  fontWeight: "bold",
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                }}
              >
                {alert.message}
              </div>
            ))}
            <button style={styles.button}>Acknowledge All</button>
          </Card>

          <Card
            title="Weather"
            customStyle={{
              backgroundColor: getWeatherBackground(weatherCondition),
              color: "white",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{weatherCondition}</p>
            <p style={{ fontSize: "3rem" }}>{renderWeatherIcon(weatherCondition)}</p>
          </Card>

          <Card title="Failure History">
            <Bar data={failureHistoryData} />
          </Card>

          <Card title="Custom Prediction Input">
            {inputValues.map((val, i) => (
              <div key={i} style={{ marginBottom: "15px" }}>
                <label style={styles.inputLabel}>{inputLabels[i]}</label>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => handleChange(i, e.target.value)}
                  placeholder={inputLabels[i]}
                  style={styles.input}
                />
              </div>
            ))}
            <button style={styles.button} onClick={fetchPrediction}>
              Predict
            </button>
            {prediction !== null && (
              <p style={styles.predictionLine}>Prediction: {prediction} days</p>
            )}
          </Card>

          <Card title="Mileage Since Last Maintenance">
            <Bar data={mileageData} />
          </Card>

          <Card title="Engine Hours">
            <Bar data={engineHoursData} />
          </Card>

          <Card title="Average Speed">
            <Bar data={averageSpeedData} />
          </Card>

          <Card title="Oil Quality Sensor">
            <Bar data={oilQualitySensorData} />
          </Card>
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, children, customStyle }) => (
  <div style={{ ...styles.card, ...customStyle }}>
    <h2 style={styles.cardTitle}>{title}</h2>
    {children}
  </div>
);

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #6EE7B7, #3B82F6, #9333EA)",
    padding: "0",
  },
  titleBar: {
    width: "100%",
    backgroundColor: "#1E3A8A",
    padding: "15px 30px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    marginBottom: "40px",
  },
  titleText: {
    margin: 0,
    color: "white",
    fontSize: "2.5rem",
  },
  contentBox: {
    width: "100%",
    maxWidth: "1400px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
    color: "#000",
    marginTop: "30px",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "30px",
  },
  mainHeading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#1F2937",
  },
  subHeading: {
    fontSize: "1.2rem",
    color: "#6B7280",
  },
  gridLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "30px",
  },
  card: {
    backgroundColor: "#f9fafb",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    color: "#000",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: "20px",
  },
  predictionText: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#EF4444",
  },
  predictionLine: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginTop: "15px",
  },
  button: {
    marginTop: "15px",
    padding: "12px 24px",
    backgroundColor: "#3B82F6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
  input: {
    marginTop: "5px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    width: "100%",
  },
  inputLabel: {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#374151",
  },
};

export default App;
