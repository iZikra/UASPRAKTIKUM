// src/stores/weatherStore.js
import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    weatherWidgets: [],
  }),
  actions: {
    async fetchWeather(location) {
      const apiKey = "3ec2aa1b688e7ff62d4a15d75e22e4ac";
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const weather = await response.json();
        this.weatherWidgets.push(weather);
      } catch (error) {
        console.error("Failed to fetch weather data:", error.message);
      }
    },
    removeWidget(index) {
      this.weatherWidgets.splice(index, 1);
    },
  },
});
