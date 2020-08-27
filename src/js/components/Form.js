import React, { useState, useEffect } from "react";

import getState from "./stateFromZip";

import GetWeather from "./GetWeather";

function Form() {
  const [input, setInput] = useState("");
  const [value, setValue] = useState("03103");
  const [locationData, setLocationData] = useState([]);
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [sunrise, setSunrise] = useState("")
  const [sunset, setSunset] = useState("");
  const [state, setState] = useState("");
  const [humidity, setHumidity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const test = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${value}&appid=6cde39c070ab7fafab6d114e1b3f8cdc`
      );

      const json = await test.json();

      if (json.message) {
        alert("Please enter a valid US Zip-code and try again.");
        return;
      }

      setLocationData(json);
      setTemp(
        Math.round((((json.main.temp - 273.15) * 9) / 5 + 32) * 100) / 100
      );
      setWeather(json.weather[0].main);
      setSunset(
        new Date(json.sys.sunset * 1000).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
      setSunrise(
        new Date(json.sys.sunrise * 1000).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
      setState(getState(value));
      setHumidity(json.main.humidity);
    };

    fetchData();
  }, [value]);

  function handleChange(event) {
    setInput(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setValue(input);
  }

  return (
    <div>
      <div className="title"></div>
      <form className="form" onSubmit={handleSubmit}>
        <label></label>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Enter A Zip Code"
          minLength="5"
          maxLength="5"
        />
        <input className="submit" type="submit" />
      </form>

      <GetWeather
        zip={value}
        temp={temp}
        location={`${locationData.name}, ${state}`}
        weather={weather}
        humidity={humidity}
        sunrise={sunrise}
        sunset={sunset}
      />
    </div>
  );
}

export default Form;
