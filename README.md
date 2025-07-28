# Predictive Maintenance Dashboard for vehicles


An AI-powered full-stack dashboard that predicts vehicle maintenance needs based on environmental and usage patterns. This project combines machine learning, real-world weather and terrain data, and interactive web visualization to deliver intelligent diagnostics and maintenance tracking for individual vehicles.

---

## Features

- ML-Based Predictive Analytics: Trained a Random Forest model to anticipate vehicle maintenance needs using terrain difficulty, weather conditions, and vehicle usage patterns.
- Live Weather & Terrain Integration: Integrated OpenWeatherMap API and simulated terrain inputs to personalize maintenance timelines.
- Interactive Dashboard: Built with React and Vite for a smooth multi-page web experience with real-time visualizations.
- User Authentication: Secure login/logout system using JWT tokens and session management.
- Vehicle History Logging: Tracks and displays each vehicle’s maintenance history and future risk scores.
- Future Extensions:
- Fleet-level analytics
- AI chatbot for driver queries and support
- Integration with GPS and OBD data

---

## Tech Stack

| Layer | Tools |
| Machine Learning | Python, Pandas, Scikit-learn, Random Forest |
| Backend | Python, Flask |
| Frontend | React.js, Vite, JavaScript |
| APIs | OpenWeatherMap API |
| Visualization | Chart.js, React-Vis |
| Deployment |(AWS)|

---
## How It Works
1. Data Collection
Inputs are gathered from simulated or real-world sources, including:
Vehicle usage data (distance, duration, load)
Environmental conditions via the OpenWeatherMap API (temperature, humidity, weather type)
Terrain classification (e.g., hilly, urban, off-road)
2. Model Training
A Random Forest model is trained on this dataset to predict:
Maintenance risk score
Estimated time-to-service
The model captures correlations between environmental stress and mechanical degradation for smarter planning.
3. Prediction Pipeline
When a user logs new trip data or weather changes:
The backend processes the input through the trained model.
Maintenance predictions and risk scores are generated.
These predictions are served through secure backend APIs to the dashboard.
4. Interactive Dashboard
Built using React + Vite, the UI features:
User Authentication: Secure login/logout per user or fleet admin.
Vehicle Overview: View current condition, service risk, and prediction summary.
Maintenance History: Timeline view of past services and predicted needs.
Visual Analytics: Risk heatmaps, condition curves, and comparative charts.
5. Fleet Management Extensions (Planned/Modular)
Admins can manage multiple vehicles in a unified view.
Aggregate maintenance trends across the fleet.
Prioritize servicing based on urgency, usage patterns, and shared routes.
6. AI Chatbot Integration (Planned)
An intelligent assistant for:
Answering vehicle-specific questions: “When is my next service?”
Explaining model predictions: “Why is the risk score high?”
Offering maintenance tips based on driving conditions.
Future support for voice input and multilingual interaction.




