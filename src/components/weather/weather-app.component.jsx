import sunny from '../../assets/images/sunny.png'
import cloudy from '../../assets/images/cloudy.png'
import rainy from '../../assets/images/rainy.png'
import snowy from '../../assets/images/snowy.png'

import './weather-app.styles.css';

const WeatherComponent = () => {
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">Denver</div>
          </div>
          <div className="search-bar">
            <input type="text" placeholder='Enter Location'/>
            <i className="fa-solid fa-magnify-glass"></i>
          </div>
        </div>
        <div className="weather">
          <img src={sunny} />
          <div className="weather-type">Clear</div>
          <div className="temp">27°C</div>
        </div>
        <div className="weather-date">
          <p>Friday , 3 May</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="dat-name">
              Humidity
            </div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">35%</div>
          </div>
          <div className="wind">
            <div className="dat-name">
              Wind
            </div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">3 km/hr</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherComponent;
