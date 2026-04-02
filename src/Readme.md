# 🌍 Weather Dashboard

A simple weather dashboard built using React that shows real-time weather data and historical trends based on user location.

---

## 📌 About the Project

This project was built to explore how APIs and frontend visualization can be combined to create useful real-world dashboards.

The app automatically detects the user's location and displays:

* Current weather
* Hourly forecasts
* Air quality data
* Historical weather trends

---

## 🚀 Features

* 📍 Auto location detection using browser GPS
* 🌡️ Current temperature (min / max / current)
* 💨 Wind speed, humidity, visibility
* 🌅 Sunrise & sunset timing
* 🌧️ Rain probability and precipitation
* 🌫️ Air quality (PM10, PM2.5)
* 📊 Interactive charts (scroll + zoom)
* 📅 Historical data analysis (up to 2 years)
* 🔁 Temperature toggle (°C / °F)

---

## 🧠 Tech Stack

* React (Vite)
* Recharts (for graphs)
* Open-Meteo API
* JavaScript (ES6)

---

## ⚙️ How to Run Locally

```bash
git clone https://github.com/sahilsingh78/weather-dashboard.git
cd weather-dashboard
npm install
npm run dev
```

---

## 📊 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── utils/
 ├── App.jsx
```

---

## 📈 Some Notes

* Used Open-Meteo API for weather & air quality data
* Charts are scrollable and support zoom for better readability
* Added validation for date ranges (max 2 years)
* Wind direction is simplified into readable format (N, NE, etc.)

---

## ⚠️ Limitations

* Historical data depends on API availability
* Air quality data is approximate
* Not intended for critical use

---

## 🌐 Live Demo

https://weather-dashboard-gold-gamma.vercel.app/

---

## 🤝 Contributing

This is a personal project, but suggestions are always welcome.

---

## 📄 License

Free to use for learning purposes.

---

# 👨‍💻 Author

**Sahil Singh**

B.Tech Information Technology
Galgotias College of Engineering and Technology

GitHub
https://github.com/sahilsingh78
