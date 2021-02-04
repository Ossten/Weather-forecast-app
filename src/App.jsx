import logo from "./img/logo.svg";
import React from "react";
import "./App.css";
import { AK } from "./config.js";
import video from "./img/video.webm";
import { WeatherCard } from "./WeatherCard/WeatherCard.jsx";
import { Header } from "./Header/Header";

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);

    this.positionChange = this.positionChange.bind(this);

    this.state = {
      weatherData: [],
      loc: "eba2d4e00ab8a7f",
      lat: 0,
      lon: 0,
      k: AK,
      isLoadedWeather: false,
      isLoadedLocation: false,
    };
  }
  // Position comming from header
  positionChange(position) {
    this.setState((state) => {
      return {
        ...state,
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
    });
    // console.log("position:", position);
    // console.log("coordionates: ", this.state.lat, this.state.lon);
    // console.log("weather data: ", this.state.weatherData);

    this.forceUpdate();
    (() => {
      this.componentDidMount();
    })();
  }

  componentDidMount() {
    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${this.state.loc}${this.state.k}`
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState((state) => {
          // da se pazit na ova , ne go znaev prethodniot state --- vidi dokumnetacija
          return {
            ...state,
            isLoadedWeather: true,
            weatherData: json,
          };
        });
      });
  }

  render() {
    var { isLoadedWeather, weatherData, lon, lat } = this.state;
    if (!isLoadedWeather) {
      return <div>Loading...</div>;
    } else {
      // console.log(this.state.lat, this.state.lon);
      return (
        <div className="weatherApp">
          <div id="video">
            <video className="video" autoPlay loop muted>
              <source src={video} type="video/webm" />
              <source src={video} type="video/ogg" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="logo">
            <div>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </div>
          <Header
            weatherData={weatherData}
            lat={lat}
            lon={lon}
            handlePositionChange={this.positionChange}
          />
          <WeatherCard
            // onChange={this.onChange.bind(this)}
            weatherData={weatherData}
          />
        </div>
      );
    }
  }
}

export default WeatherApp;
