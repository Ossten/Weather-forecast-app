import logo from './img/logo.svg';
import React from 'react';
import './App.css';
import { AK } from './config.js';
import video from './img/video.webm';
import './weatherCard.css'

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: [],
      loc: 'eba2d4e00ab8a7f',
      lat: 59.91273,
      lon: 10.74609,
      k: AK,
      isLoaded: false,
    }
  }

  componentDidMount() {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&exclude=current,minutely,hourly,alerts&appid=${this.state.loc}${this.state.k}`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          weatherData: json,
        })
      })
  }

  date(epoch) {
    let d = new Date(parseInt(epoch) * 1000)
    const weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    const month = new Array(12);
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
    return (<div>
      <p>{weekday[d.getDay()]}</p>
      <p>{d.getDate()}. {month[d.getMonth()]}. {d.getFullYear()}</p>
    </div>)
  }

  getCardinalDirection(angle) {
    const directions = ['↑ N', '↗ NE', '→ E', '↘ SE', '↓ S', '↙ SW', '← W', '↖ NW'];
    return directions[Math.round(angle / 45) % 8];
  }

  render() {
    var { isLoaded, weatherData } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    }
    else {
      return (
        <div className="weatherApp" >
          <div id="video">
            <video className="video" autoPlay loop muted>
              <source src={video} type="video/webm" />
              <source src={video} type="video/ogg" />
            Your browser does not support the video tag.
          </video>
          </div>
          <div>
            <header className="App-header">
              <div>
                <img src={logo} className="App-logo" alt="logo" />
              </div>
              <div className="title title_front">
                <p >8-Day Weather Forecast</p>
                <p>{weatherData.timezone}</p>
              </div>
            </header>
          </div>
          <div className="cardWrapper">
            {weatherData.daily.map(daily => {
              return (
                <div key={daily.dt} className="weatherCard" >
                  <div className="weatherCard weatherCard__front">
                    <p>{this.date(daily.dt)}</p>
                    <content>
                      <div>{daily.weather.map(weather => {
                        return (
                          <div>
                            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} className="weatherIcon" alt={'aaa'} />
                            <p>{weather.description}</p>
                          </div>)
                      })}
                      </div>
                      {daily.temp.day}°C
                    </content>
                  </div>
                  <div className="weatherCard weatherCard__back">
                    <div>{daily.weather.map(weather => {
                      return (
                        <div>
                          <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} className="weatherIcon__back" alt={'aaa'} />
                          <p>{this.date(daily.dt)} </p>
                        </div>
                      )
                    })}
                    </div>
                    <div className="weatherCard__back-content">
                      <content>
                        <div>
                          <ul><u>Temperature</u></ul>
                          <li>Day: {daily.temp.day}°C<br></br> - feels: {daily.feels_like.day}°C</li>
                          <li>Night: {daily.temp.night}°C <br></br> - feels: {daily.feels_like.night}°C</li>
                          <li>Evening: {daily.temp.eve}°C <br></br> - feels: {daily.feels_like.eve}</li>
                          <li>Morning: {daily.temp.morn}°C <br></br> - feels: {daily.feels_like.morn}</li>
                          <li>Minimum: {daily.temp.min}°C</li>
                          <li>Maximum: {daily.temp.max}°C</li>
                        </div>
                        <div>
                          <p>Pressure: {daily.pressure} hPa</p>
                          <p>Humidity: {daily.humidity}%</p>
                          <p>Wind: {daily.wind_speed}ms<sup>-1</sup> &nbsp;  {this.getCardinalDirection(daily.wind_deg)} </p>
                        </div>
                      </content>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div >
      );
    }
  }
}

export default WeatherApp;
