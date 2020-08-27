import React from "react";

function GetWeather(props) {
  return (
    <div className="">
      <div className="data">
        <h1 className="location">{props.location}</h1>
        <div className="temp">{props.temp} °F</div>
        <div className="details">
          <div>{props.weather}</div>
          <div>Humidity: {props.humidity}%</div>
          <div>Sunrise: {props.sunrise}</div>
          <div>Sunset: {props.sunset}</div>
        </div>
      </div>
    </div>
  );
}

export default GetWeather;
