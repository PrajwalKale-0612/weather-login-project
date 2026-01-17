if(localStorage.getItem("isLoggedIn") !== "true")
{
    window.location.href = "login.html";
}

const BASE_URL="https://api.open-meteo.com/v1/forecast?";
const BASE_URL2="https://api.openweathermap.org/data/2.5/weather?q=";

const btn=document.querySelector("button");
const msg=document.querySelector(".msg p");
let s=document.querySelectorAll("sup");
let input=document.querySelector("#city");

localStorage.setItem("lastcity",input.value);
window.addEventListener("load",()=>
      {
            let input=document.querySelector("#city");
            const city=localStorage.getItem("lastcity");
            if (city) 
            {
            input.value=city;
            console.log(city);
            getWeather();
           }
      });


let temperature = 30;
let result = temperature + "\u00B0C";
console.log(result); 


async function getWeather() 
{
      if (input.value.trim()==="") 
      {
            msg.innerText="Please enter a city name";
            return;
      }
      
      loader.style.display = "block";
      try 
      {
            const Time_URL=`https://geocoding-api.open-meteo.com/v1/search?name=${input.value}&count=1&language=en`;
            let response1= await fetch(Time_URL);
            let data1= await response1.json();
            if (!data1.results || data1.results.length ===0) 
            {
                  throw new Error("Invalid city name . ")
            }
                  
                  const latitude=data1.results[0].latitude;
                  console.log(data1);
                  const longitude=data1.results[0].longitude;
                  const timezone=data1.results[0].timezone;
                  
                  const URL2=`${BASE_URL2}${input.value.toLowerCase()}&appid=181c06d98856db11958458ef4250548a&units=metric`;
                  let response2= await fetch(URL2);
                  let data2= await response2.json();
                  if (Number(data2.cod) !==200) 
                  {
                        throw new Error(" city not found in weather api . ");  
                  }

                  
                  const condition = data2.weather[0].main;
                  const description = data2.weather[0].description;
                  const iconCode = data2.weather[0].icon;
                  
                  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;   
                  
                  const URL=`${BASE_URL}latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_min,temperature_2m_max&timezone=${timezone}`;
                  let response3= await fetch(URL);
                  let data3= await response3.json();
                  
                  console.log(data3);
                  
                  
                  const Time=data3.daily;
                  if (!data3.daily || Time.time.length<3) 
                  {
                        throw new Error("Daily weather data not available");
                  }
                        
                        const today = new Date();
                        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                        const tomorrowIndex = (today.getDay() + 2) % 7;
                        const name2 = days[tomorrowIndex]; 
                        
                        const now = new Date();
                        const CurrTime = now.toLocaleTimeString();
                        
                        
                        msg.innerText=`${input.value.toUpperCase()}  weather Information :\n\n Today  : ${Time.time[0]} =>   Min = ${Time.temperature_2m_min[0]}\u00B0C and Max = ${Time.temperature_2m_max[0]}\u00B0C \n\n  Tomorrow : ${Time.time[1]}  =>     Min = ${Time.temperature_2m_min[1]}\u00B0C and Max = ${Time.temperature_2m_max[1]}\u00B0C \n\n  ${name2} : ${Time.time[2]}  =>     Min = ${Time.temperature_2m_min[2]}\u00B0C and Max = ${Time.temperature_2m_max[2]}\u00B0C \n\nToday feels_Like : ${data2.main.feels_like}\nToday pressure : ${data2.main.pressure} hpa ,Today Clouds : ${data2.clouds.all} %\n\nCurrent Time : ${CurrTime}\n`
                       
                        const actual_temp=(Time.temperature_2m_min[0]+Time.temperature_2m_max[0])/2;
                        showTemperature(actual_temp);
                        console.log(actual_temp);


            document.getElementById("iconImg").src = iconURL;
            document.getElementById("conditionName").innerText = condition;

            }
            catch(error)
            {
                  msg.innerText="City not found . Please enter a valid city name . ";
                  console.error(error.message);
            }finally
            {
                  loader.style.display = "none";
            }
            
      }
      

      
      let isCelsius = true;      
      let currentTempC = 0;
      
      const tempResult = document.getElementById("tempResult");
      const toggleBtn = document.getElementById("unitToggle");
      
      function showTemperature(tempC) 
      {
          currentTempC = tempC;
          tempResult.innerText = `Temperature: ${tempC.toFixed(1)} °C`;
      }
      
      // Toggle button
      toggleBtn.addEventListener("click", () => 
      {
            if (isCelsius) 
            {
                  // C → F
                  const tempF = (currentTempC * 9/5) + 32;
                  tempResult.innerText = `Temperature: ${tempF.toFixed(1)} °F`;
                  toggleBtn.innerText = "°F → °C";
            } 
            else 
            {
              // F → C
              tempResult.innerText = `Temperature: ${currentTempC.toFixed(1)} °C`;
              toggleBtn.innerText = "°C → °F";
           }
          isCelsius = !isCelsius;
      });
      


const clmsg=document.getElementById("loc");      
function getCityFromLocation()
{
      if (!navigator.geolocation) 
      {
            console.log("Geolocation not supported . ");
            return;
      }      

      navigator.geolocation.getCurrentPosition(async(position)=>
      {
            try
            {
                  const lat=position.coords.latitude;
                  const lon=position.coords.longitude;
                  console.log("Latitude ",lat);
                  console.log("Longitude",lon);

                  const URL=`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=181c06d98856db11958458ef4250548a`;
                  const response=await fetch(URL);
                  const data=await response.json();

                  console.log(data);

                  if(data.length>0)
                  {
                        console.log("City Name ",data[0].name);
                        console.log("State Name ",data[0].state);
                        console.log("Country Name ",data[0].country);
                        console.log(clmsg);
                        clmsg.innerText=`City : ${data[0].name}\nState : ${data[0].state}\nCountry : ${data[0].country}`;
                  }      
                  else
                  {
                        console.log("City not found");
                  }      
            }      
            catch(error)
            {
                  console.log("Error While fetching city name ");
            }      
      },      
      ()=>{
          console.log("Location permission denied ");    
      });    
}      

btn.addEventListener("click",(e)=>
{
      e.preventDefault();
      getWeather();
});      

input.addEventListener("keydown",(e)=>
{
      if (e.key==="Enter") 
      {
            getWeather();
      }      
});      



const lBtn=document.getElementById("locationBtn");
lBtn.addEventListener("click",getCityFromLocation);




