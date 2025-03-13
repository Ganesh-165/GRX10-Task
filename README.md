# Weather App

## 🌤 Overview

This is a modern weather application built using **React + Vite** that provides real-time weather updates based on city searches. It fetches weather data from the **OpenWeather API** and uses the **GeoDB Cities API** for city suggestions.

## 🚀 Features

- **Search for any city** and get real-time weather data.
- **Auto-suggestions for cities** using the GeoDB Cities API.
- **Displays weather details** like temperature, humidity, wind speed, and conditions.
- **Dynamic UI** that changes based on weather conditions.
- **Optimized performance** with React & Vite.

## 🛠 Tech Stack

- **Frontend:** React, Vite, TypeScript
- **APIs Used:**
  - [OpenWeather API](https://openweathermap.org/api) for weather data
  - [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) for city search
- **Styling:** Tailwind CSS / Custom CSS

## 📦 Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Ganesh-165/GRX10-Task.git

```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add your API keys:

```env
VITE_API_URL="https://api.openweathermap.org/data/2.5/forecast?q="
VITE_API_KEY="your_api_key"
VITE_API_URL_CITY="https://api.openweathermap.org/geo/1.0/direct"
VITE_API_KEY_CITY="your_api_key"
```

### 4️⃣ Start the Application

```sh
npm run dev
```

## 📸 Screenshots

![alt text](<Screenshot 2025-03-13 114150.png>)
