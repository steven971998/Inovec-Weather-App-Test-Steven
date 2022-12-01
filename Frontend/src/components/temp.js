import React, { useState, useEffect } from "react";
import "./style.css";

const Temp = () => {
  const [date, setDate] = useState();
  const [weatherState, setWeatherState] = useState();
  const [tempInfo, setTempInfo] = useState({});

  const { MinTemp, MaxTemp, AvgTemp, Summary } = tempInfo;

  useEffect(() => {
    if (Summary) {
      switch (Summary) {
        case "Partly Cloudy || Mostly Cloudy":
          setWeatherState("wi-day-cloudy");
          break;
        case "Foggy":
          setWeatherState("wi-fog");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        case "Overcast":
          setWeatherState("wi-rain");
          break;
        default:
          setWeatherState("wi-day-sunny");
          break;
      }
    }
  }, [Summary]);

  useEffect(() => {
    newdata();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  //Fetching the data.
  async function newdata() {
    const data = await fetch(`http://localhost:5000/weatherdata/${date}`);
    const result = await data.json();

    var { MinTemp, MaxTemp, AvgTemp, Summary } = result[0];

    //To convert temperatures into 2 decimal values.
    MinTemp = MinTemp.toFixed(2);
    MaxTemp = MaxTemp.toFixed(2);
    AvgTemp = AvgTemp.toFixed(2);

    const myNewWeatherInfo = {MinTemp,MaxTemp,AvgTemp,Summary};
    setTempInfo(myNewWeatherInfo);
  }

  return (
    <>

    <h1> Weather App</h1>

      {/* DatePicker */}
      <div className="datepicker">
        <h2>Select Date :</h2>
      <input
        className="datepickerInput"
        id="search"
        type="date"
        onChange={(e) => setDate(e.target.value)}
      ></input>
</div>
      
      {/* Weather Icon */}
      <article className="widget">
        <div className="weatherIcon">
          <i className={`wi ${weatherState}`}></i>
        </div>

        {/* Minimum Temperature */}
        <div className="extra-temp">
          <div className="temp-info-minmax">
            <div className="two-sided-section">
              <p className="extra-info-leftside">
                Min Temperature
                <br /> {MinTemp} °C
              </p>
            </div>

            {/* Maximum Temperature */}
            <div className="two-sided-section">
              <p className="extra-info-leftside">
                Max Temperature
                <br /> {MaxTemp} °C
              </p>
            </div>
          </div>

          {/* Average Temperature */}
          <div className="weather-extra-info">
            <div className="two-sided-section">
              <p className="extra-info-leftside">
                Avg Temperature
                <br /> {AvgTemp} °C{" "}
              </p>
            </div>

            {/* Weather Condition Summary */}
            <div className="two-sided-section">
              <p className="extra-info-leftside">
                Weather Summary : <br />
                {Summary}
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
export default Temp;
