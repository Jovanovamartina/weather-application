console.log("connected");

let key = "1f364f9a6a792359bf6a401e35d57bd3";
let city = "veles";

//selektiranje


let result =document.getElementById("result");
let myBtn =document.getElementById("myBtn");
let input=document.getElementById("input");
//kopcinja
let home=document.getElementById("nav-home-tab");
let hourly=document.getElementById("nav-profile-tab");
let about=document.getElementById("nav-contact-tab");

let hourlyDiv=document.getElementById("hourlyDiv")
let aboutDiv=document.getElementById("about");

let table=document.querySelector("table");




// ajax
function weatherApp(cityInput){
    let apiUrl =` https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&units=metric&APPID=${key} `
    $.ajax({
        url:apiUrl,
        success:function(response){
            console.log("success",response);
            printResult(response,result);
            printHourly(response,result);
        },
        error:function(error){
            console.log(error);
        },
    });
};

window.addEventListener("load",()=>{
    weatherApp("Veles");
})

myBtn.addEventListener("click",function(){
    weatherApp(input.value);
})
/*
function printResult(data,element){
    let temperature = findTemper(data);
    console.log(temperature);
    element.innerHTML = ` <h1> ${data.city.name} </h1>
    <h3> Temperarture  ${data.list[0].main.temp} </h3>
    <h3> Feels Like  ${data.list[0].main.feels_like} </h3>
    
    <h3> Highest Temerature  ${temperature.highestTemp.main.temp}</h3>
    <h3> Lower Temperature  : ${temperature.lowestTemp.main.temp}</h3>

    <h3> Highest humidity  ${temperature.highestHum.main.humidity}</h3>
    <h3> Lowest humidity  ${temperature.lowestHum.main.humidity}</h3>

    <h3> Average Temperature  ${temperature.avgTemp}</h3>
    <h3> Average Humidity  ${temperature.avgHumidity}</h3>
    `
}
*/
function printResult(data,element){
    let temperature = findTemper(data);
    console.log(temperature);
    element.innerHTML =`
    <li class="list-group-item">City ${data.city.name}</li>
    <li class="list-group-item">Temperature ${data.list[0].main.temp} </li>
    <li class="list-group-item">Feels like ${data.list[0].main.feels_like}</li>
    <li class="list-group-item">Highest Temerature ${temperature.highestTemp.main.temp} </li>
    <li class="list-group-item">Lower Temperature ${temperature.lowestTemp.main.temp}</li>
    <li class="list-group-item">Highest humidity ${temperature.highestHum.main.humidity} </li>
    <li class="list-group-item">Lowest humidity ${temperature.lowestHum.main.humidity} </li>
    <li class="list-group-item">Average Temperature  ${temperature.avgTemp}</li>
    <li class="list-group-item">Average Humidity${temperature.avgHumidity} </li>
    `
}

function findTemper(data){
    let highestTemp = data.list[0];
    let lowestTemp = data.list[0];
    let lowestHum = data.list[0];
    let highestHum = data.list[0];
    let temperatureSum = 0;
    let humiditySum = 0;

  for(let i = 0 ; i<data.list.length; i++){
      if(highestTemp.main.temp < data.list[i].main.temp){
          highestTemp = data.list[i];
      }
      if(lowestTemp.main.temp > data.list[i].main.temp){
          lowestTemp = data.list[i];
      }
      if(highestHum.main.humidity < data.list[i].main.humidity){
          highestHum = data.list[i];
      }
      if(lowestHum.main.humidity > data.list[i].main.humidity){
          lowestHum = data.list[i]
      }
      temperatureSum += data.list[i].main.temp;
      humiditySum += data.list[i].main.humidity;

  }
  return {
      highestTemp:highestTemp,
      lowestTemp,
      highestHum,
      lowestHum,
      avgTemp: temperatureSum / data.list.length,
      avgHumidity : humiditySum / data.list.length
  }
}


function printHourly(dataTwo){
    table.innerHTML="";
    for (let i = 0;i < dataTwo.list.length;i++){
        table.innerHTML +=`
        <td><img src="http://openweathermap.org/img/w/${dataTwo.list[i].weather[0].icon}.png"/> </td>
        <td>${dataTwo.list[i].weather[0].description}</td>
        <td>${dataTwo.list[i].dt_txt}</td>
        <td>${dataTwo.list[i].main.temp}</td>
        <td>${dataTwo.list[i].main.humidity}</td>
        <td>${dataTwo.list[i].wind.speed}</td>

        `
    }
    console.log(table);
};


home.addEventListener("click" ,()=>{
    result.style.display="block";
hourlyDiv.style.display ="none";
aboutDiv.style.display="none";
});

hourly.addEventListener("click" ,()=>{
    result.style.display="none";
    hourlyDiv.style.display ="block";
    aboutDiv.style.display="none";
    });

    about.addEventListener("click" ,()=>{
        result.style.display="none";
        hourlyDiv.style.display ="none";
        aboutDiv.style.display="block";
        });



