from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle
import numpy as np
import pandas as pd
import os

# Initialize the Flask app
app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)

# Load model and feature columns
with open("maintenance2_predicter.pkl", "rb") as f:
    model = pickle.load(f)

with open("feature_columns.pkl", "rb") as f:
    feature_columns = pickle.load(f)

# Load dataset for metrics
try:
    df = pd.read_csv("logistics_dataset_with_maintenance_required.csv")
except FileNotFoundError:
    print("❌ The dataset file is missing!")
    df = pd.DataFrame()

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    features = data.get("features")

    if not features or not isinstance(features, list):
        return jsonify({"error": "Invalid input, features must be a list"}), 400

    try:
        input_df = pd.DataFrame([features], columns=feature_columns)
        missing_columns = set(feature_columns) - set(input_df.columns)
        for col in missing_columns:
            input_df[col] = 0
        input_df = input_df[feature_columns]
        prediction = model.predict(input_df)
        return jsonify({"prediction": int(prediction[0])})
    except Exception as e:
        print("❌ Prediction Error:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route("/metrics")
def metrics():
    if "Oil Pressure" in df.columns and "Tire Pressure" in df.columns and "Battery Health" in df.columns:
        return jsonify({
            "Oil Pressure": df["Oil Pressure"].mean(),
            "Tire Pressure": df["Tire Pressure"].mean(),
            "Battery Health": df["Battery Health"].mean()
        })
    else:
        return jsonify({"error": "Required columns missing in dataset"}), 400

@app.route("/failures")
def failures():
    if "Date" in df.columns and "Maintenance Required" in df.columns:
        df["Date"] = pd.to_datetime(df["Date"])
        df["Month"] = df["Date"].dt.strftime("%b")
        failure_counts = df[df["Maintenance Required"] == 1]["Month"].value_counts().sort_index()
        return jsonify(failure_counts.to_dict())
    else:
        return jsonify({"error": "Required columns missing in dataset"}), 400

@app.route("/health-metrics", methods=["GET"])
def health_metrics():
    try:
        return jsonify({
            "Average Oil Pressure": df["oil_pressure"].mean() if "oil_pressure" in df else 0,
            "Average Tire Pressure": df["tire_pressure"].mean() if "tire_pressure" in df else 0,
            "Battery Health": df["battery_health"].mean() if "battery_health" in df else 0,
            "Engine Temperature": df["engine_temp"].mean() if "engine_temp" in df else 0
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Catch-all route to serve React frontend (for any unknown paths)
@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(app.static_folder, path)

# Start Flask app
if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=5001)
