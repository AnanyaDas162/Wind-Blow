import React , {useState,useEffect} from "react";
import rain from "./Images/rain.jpg";
import Mist from "./Images/Mist.jpg";
import rain3 from "./Images/rain3.jpg";
import sunny1 from "./Images/sunny1.jpg";
import haze2 from "./Images/haze2.jpg";
import storm from "./Images/storm.jpg";
import './App.css';

function App() {

const [api, setApi] = useState("Kolkata");
const [city, setCity] = useState("");
const [cloud, setCloud] = useState("");
const [humidity, setHumidity] = useState("");
const [wind_degrees, setWind_degrees] = useState("");
const [wind_speed, setWind_speed] = useState("");
const [pressure, setPressure] = useState("");
const [max_temp, setMax_temp] = useState("");
const [min_temp, setMin_temp] = useState("");
const [feelslike, setFeelsLike] = useState("");
const [temp, setTemp] = useState("");
const [vis, setVis] = useState("");
const [main, setMain] = useState("");
const [sunrise, setSunrise] = useState("");
const [sunset, setSunset] = useState("");
const [img, setImg] = useState("rain2");
const [xyz, setXyz] = useState("");

async function weather_data(){
 try{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${api}&appid=dc5c5a4cceb690df8354444889848aa4`);
  const res = await response.json();
  const{name}=res;
  console.log(res);
   setCity(name);
   setCloud(res.clouds.all);
   setHumidity(res.main.humidity);
   setWind_degrees(res.wind.deg);
   setWind_speed(res.wind.speed);
   setPressure(res.main.pressure);
   setMax_temp(res.main.temp_max);
   setMin_temp(res.main.temp_min);
   setFeelsLike(res.main.feels_like);
   setTemp(res.main.temp);
   setVis(res.visibility);
   setMain(res.weather[0].main);
   setSunrise(res.sys.sunrise);
   setSunset(res.sys.sunset);
   var d = new Date((new Date().getTime())+ res.timezone*1000)
   var x = d.toISOString();
   setXyz(x);
   console.log("The date is: ", x);
   
  var a = new Date((res.sys.sunrise + res.timezone) * 1000);
  var y = a.toISOString();
  setSunrise(y);


   a = new Date((res.sys.sunset + res.timezone) * 1000);
   y = a.toISOString();
  setSunset(y);

   /*function calcTime( offset) {
    // create Date object for current location
    var d = new Date(res.dt);
  
    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = res.sys.sunrise.getTime() + (res.timezone * 1000);
  
    // create new Date object for different city
    // using supplied offset
    var date = new Date(utc * 1000);
    var timestr = date.toLocaleString();

    setXyz(timestr);
  }
  
  calcTime(res.timezone);*/

   console.log(res.dt);

   if (res.weather[0].main === "Haze"){
    setImg(haze2);
  }
  else if (res.weather[0].main === "Clouds")  {setImg(rain3);
  }
  else if (res.weather[0].main === "Clear"){setImg(sunny1);
  }
  else if (res.weather[0].main === "Rain"){setImg(rain);}
  else if (res.weather[0].main === "Thunderstorm"){setImg(storm);}
  else{
    setImg(Mist);
   }

 }

 


 catch(error){
  if (error.message){
    setCity("No Data Found");
  } 
}
}

useEffect(()=>{
  weather_data();
},[])



/*var sec = sunrise;
var date = new Date(sec * 1000);
var timestr = date.toTimeString(); ('en-US', { timeZone: 'America/New_York' });


var date = new Date(sunset * 1000);
var setTimeStr = date.toLocaleTimeString();

var date = new Date(date_of_day * 1000);
var proper_date = date.getDate();
var proper_month = date.getMonth();
var proper_year = date.getFullYear();*/



/*console.log(date);
console.log(proper_date);
console.log(proper_month);*/


  return (
  <>
    <section className="android-background-container">
      <img src={img} className="android-image-background-container"  alt="backgroundImage"/>
      <a className="android-go-down-button" href="#menubar">Go Down</a>
    </section>
    <div className="background-container">
    <div className="background-glassmorphism">
      <div className="image-container">
        <section className="weather-image">

      
    {/*} { main=="Haze"?<img className="img" src="./Images/haze.jpg"alt="Rain-img"/>:
     <img className="img" src={ "./Images/rain2.jpeg" }alt="Rain-img"/>

    } */}
        <img className="img" src={img} alt="backgroundImage"/>
        <div id = "menubar"className="weather-menubar">

            <div className="weather-search-bar">
              <input type="text" className="search-input" placeholder="Type City Name" onChange={(data) => {setApi(data.target.value)}}/>
              <button className="button" onClick={weather_data}>
             <span className="material-symbols-outlined" style={{ color:"white", height:"100%", width:"100%",fontSize:"300%"}}>
                  search
             </span>
          </button>
             
            </div>
            <div className="weather-details">
                 <h1 className="weather-details-heading">Weather Details</h1>
            </div>
            <div className="weather-description">
              <section className="column-1">
                <h3 className="weather-description-heading">Maximum</h3>
                <h3 className="weather-description-heading">Minimum</h3>
                <h3 className="weather-description-heading">Feels Like</h3>
                <h3 className="weather-description-heading">Cloudy</h3>
                <h3 className="weather-description-heading">Humidity</h3>
                <h3 className="weather-description-heading">Wind</h3>
                <h3 className="weather-description-heading">Pressure</h3>
                <h3 className="weather-description-heading">Visibility</h3>
                <h3 className="weather-description-heading">Sun Rise</h3>
                <h3 className="weather-description-heading">Sun Set</h3>
              </section>
              <section className="column-2" style={{paddingLeft: '18%'}}>
                <h3 className="weather-description-heading">{parseFloat(max_temp-273).toFixed(2)} °C</h3>
                <h3 className="weather-description-heading">{parseFloat(min_temp-273).toFixed(2)} °C</h3>
                <h3 className="weather-description-heading">{parseFloat(feelslike-273).toFixed(2)} °C</h3>
                <h3 className="weather-description-heading">{cloud} %</h3>
                <h3 className="weather-description-heading">{humidity} %</h3>
                <h3 className="weather-description-heading">{wind_degrees}° {wind_speed} m/s </h3>
                <h3 className="weather-description-heading">{pressure} Pa</h3>
                <h3 className="weather-description-heading">{vis} m</h3>
                <h3 className="weather-description-heading">{sunrise.substring(11, 19)}</h3>
                <h3 className="weather-description-heading">{sunset.substring(11, 19)}</h3>
              </section>
            </div>
          </div>
          <div className="weather-information">
            <section className="temp-city-status">
              <h1>{parseFloat(temp - 273).toFixed(2)}°C</h1>
            </section>
            <section  id="city"className="temp-city-status">
              <h1 >{city}</h1>
              <h6>{xyz.substring(0, 10)}</h6>
              <h6>{xyz.substring(11, 19)}</h6>
            </section>
            <section className="temp-city-status">
              <h1 style={{paddingLeft: "29%"}}>{main}</h1>
            </section>
          </div>
        </section>
      </div>
    </div>
    </div>
  </>
  );
}

export default App;
