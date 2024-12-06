import { useState, useEffect } from "react";
import sunny from "../../assets/images/sunny.png";
import cloudy from "../../assets/images/cloudy.png";
import rainy from "../../assets/images/rainy.png";
import snowy from "../../assets/images/snowy.png";
import loadingGif from "../../assets/images/loading.gif";

import "./weather-app.styles.css";

const WeatherComponent = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const apikey = "bf92a4ef36698dab79b72f7d16c80625";

  const images = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const backgroundImages = {
    Clear: "linear-gradient(to right, #f3b07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #71eeec)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)",
  };

  const backgroundImage = data.weather
    ? backgroundImages[data.weather[0].main]
    : "linear-gradient(to right, #f3b07c, #fcd283)";

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      const defaultLocation = "Denver";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${apikey}`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
      setLoading(false);
    };

    fetchInitialData();
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const newDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesdady",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = daysOfWeek[newDate.getDay()];
  const month = months[newDate.getMonth()];
  const dayOfMonth = newDate.getDate();
  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

  const search = async () => {
    if (location.trim() !== "") {
      setLoading(true);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData !== 200) {
        setData({ notFound: true });
      } else {
        setData(searchData);
        setLoading(false);
        setLocation("");
      }
    }
  };

  const handleKeydown = (e) => {
    e.key === "Enter" ? search() : null;
  };
  return (
    <div className="container" style={{ backgroundImage }}>
      <div
        className="weather-app"
        style={{
          backgroundImage:
            backgroundImage && backgroundImage.replace
              ? backgroundImage.replace("to right", "to top")
              : null,
        }}
      >
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={handleLocationChange}
              onKeyDown={handleKeydown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        {loading ? (
          <imag className="loader" src={loadingGif} />
        ) : data.notFound ? (
          <div className="not-found">Not Found </div>
        ) : (
          <>
            <div className="weather">
              <img src={data.weather ? images[data.weather[0].main] : null} />
              <div className="weather-type">
                {data.weather ? data.weather[0].main : null}
              </div>
              <div className="temp">
                {data.main
                  ? Math.floor(Number(data.main.temp) * 1.8 - 459.67)
                  : null}
              </div>
            </div>
            <div className="weather-date">
              <p>{formattedDate}</p>
            </div>
            <div className="weather-data">
              <div className="humidity">
                <div className="dat-name">Humidity</div>
                <i className="fa-solid fa-droplet"></i>
                <div className="data">
                  {data.main ? `${data.main.humidity}%` : null}
                </div>
              </div>
              <div className="wind">
                <div className="dat-name">Wind</div>
                <i className="fa-solid fa-wind"></i>
                <div className="data">
                  {data.wind ? `${data.wind.speed} km/hr` : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherComponent;
