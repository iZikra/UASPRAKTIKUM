<template>
  <q-page class="column items-center justify-center q-pa-md">
    <div class="input-section">
      <q-input v-model="newLocation" label="Masukkan Lokasi" @keyup.enter="addWeatherWidget" />
      <q-btn @click="addWeatherWidget" label="Add Widget" color="primary" />
    </div>
    <div class="widgets-section">
      <div
        v-for="(weather, index) in weatherStore.weatherWidgets"
        :key="index"
        class="weather-widget"
      >
        <div class="weather-details flex-column">
          <q-icon :name="getWeatherIcon(weather.weather[0].main)" size="50px" class="q-icon" />
          <div class="location">
            <h2>
              <q-icon :name="getWeatherIcon(weather.weather[0].main)" size="20px" class="q-icon" />
              {{ weather.name }}
            </h2>
          </div>
          <div class="temperature">
            <p>{{ convertTemp(weather.main.temp) }}</p>
          </div>
          <div class="details">
            <p>{{ weather.weather[0].description }}</p>
            <p>Angin: {{ weather.wind.speed }} m/s</p>
            <p>Kelembapan: {{ weather.main.humidity }}%</p>
            <p>Terasa seperti: {{ convertTemp(weather.main.feels_like) }}</p>
          </div>
          <div class="remove-btn-wrapper">
            <q-btn
              @click="removeWidget(index)"
              label="Remove Widget"
              color="negative"
              class="remove-btn"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="tasks-section">
      <q-select
        v-model="selectedTask"
        :options="tasks"
        label="Select Task"
        emit-value
        map-options
      />
      <q-btn @click="navigateToTask" label="Go to Task" color="primary" />
    </div>
    <footer class="app-footer">
      <p height-hint="150"> UAS PRAKTIKUM PBK</p>
    </footer>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { QPage, QInput, QBtn, QIcon, QSelect } from "quasar";
import { useWeatherStore } from "../stores/weatherStore";

const weatherStore = useWeatherStore();

const newLocation = ref("");

const weatherIconMapping = {
  Clear: "wb_sunny",
  Clouds: "cloud",
  Rain: "grain",
  Drizzle: "grain",
  Thunderstorm: "flash_on",
  Snow: "ac_unit",
  Mist: "blur_on",
  Smoke: "blur_on",
  Haze: "blur_on",
  Dust: "blur_on",
  Fog: "blur_on",
  Sand: "blur_on",
  Ash: "blur_on",
  Squall: "blur_on",
  Tornado: "toys",
};

const convertTemp = (tempInCelsius) => {
  return `${tempInCelsius.toFixed(1)} °C / ${(
    (tempInCelsius * 9) / 5 +
    32
  ).toFixed(1)} °F`;
};

const getWeatherIcon = (weatherMain) => {
  return weatherIconMapping[weatherMain] || "wb_cloudy";
};

const addWeatherWidget = async () => {
  await weatherStore.fetchWeather(newLocation.value);
  newLocation.value = "";
};

const removeWidget = (index) => {
  weatherStore.removeWidget(index);
};

const tasks = ref([
  { label: "Tugas 1", value: "https://vercel.com/izikras-projects/tugas1" },
  {
    label: "Tugas 2", value: "https://vercel.com/izikras-projects/tugas2",
  },
  { label: "Tugas 3", value: "" },
  {
    label: "Tugas 4", value: "https://vercel.com/izikras-projects/tugas4pbk",
  },
  { label: "Tugas 5", value: "https://vercel.com/izikras-projects/223510666-zikra" },
  { label: "Tugas 6", value: "https://vercel.com/izikras-projects/tugas6" },
]);

const selectedTask = ref(null);

const navigateToTask = () => {
  if (selectedTask.value) {
    window.location.href = selectedTask.value;
  }
};
</script>

<style scoped>
.input-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 10px;
}

.widgets-section {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  padding: 24px;
  background-color: #e1f5fe;
  border-radius: 10px;
}

.weather-widget {
  max-width: 450px;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  margin-bottom: 20px;
}

.weather-widget .weather-details {
  flex-grow: 1; /* Biarkan details memperluas space secara vertikal */
}

.remove-btn {
  width: 150px;
  margin-top: auto;
}

.weather-widget:hover {
  transform: translateY(-8px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
}

.weather-widget h2 {
  font-size: 1.6em;
  margin: 12px 0;
  color: #1e88e5;
}

.weather-widget p {
  font-size: 1em; /* Sesuaikan dengan kebutuhan */
  margin: 6px 0;
  color: #424242;
}

.weather-widget .temperature p {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 12px;
  color: firebrick;
}

.weather-widget .details p {
  font-size: 0.95em;
  margin: 4px 0;
}

.weather-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.q-icon {
  margin-bottom: 8px;
  color: #1e88e5;
}

.remove-btn {
  width: 150px;
  margin-top: auto;
}

.remove-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.location h2 {
  font-size: 1.2em; /* Sesuaikan dengan kebutuhan */
  color: #1e88e5;
}

.location {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tasks-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  align-items: center;
}

.app-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 12px;
  background-color:blue; /* Sage color */
  color: #ffffff;
  position: fixed;
  bottom: 0;
}

.q-page {
  overflow-x: hidden; /* Mencegah geser ke kanan atau kiri */
}

</style>
