// console.log("helloo shashwat");
// async function showWeather(){
//     try{
        
//         let API_key = 'a114f4875462007458c92c194a29f0b9';
//         let city_name = 'ujjain';
//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`);
//         const data = await response.json();
//         console.log(data);
//     }
//     catch(err){
//         alert('API Response Failed');
//         console.log(new Error('Not able to fetch Data'));
//     }
//     // let newPAra = document.createElement('p');
//     // newPAra.textContent = `${data?.main?.temp.toFixed(2)}  F`
//     // document.body.appendChild(newPAra);
//     // // note temperature is in kelvin
// }

// async function fetchWeather(){
   
//     // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}.34&lon=${longitude}.99&appid=${API_key}`)
//     // .then(response => response.json()).then(reponse=>console.log(reponse)).catch(err=>console.log(new Error('Error Occured'),err));
//     try{
//         let latitude = 22.75;
//         let longitude = 75.89;
//         let API_key = 'a114f4875462007458c92c194a29f0b9';
//         let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}.34&lon=${longitude}.99&appid=${API_key}`);
//         let data = await response.json();
//         console.log(data);
//     }
//     catch(err){
//         console.log('not able to fetch', err);
//     }
// }

// // showWeather();
// fetchWeather();

// // function getGeoLocation(){
// //     if(navigator.geolocation){
// //     navigator.geolocation.getCurrentPosition(showPosition());
// //     }
// //     else{
// //         console.log('No location Feature Supported')
// //     }
// // }

// // function showPosition(position){
// //     let lat = position.coords.latitude;
// //     let long = position.coords.longitude;
// //     console.log(lat);
// //     console.log(long);

// // }

// function getLocation() {
//     if(navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }
//     else {
//         console.log("No geoLocation Support");
//     }
// }

// function showPosition(position) {
//     let lat = position.coords.latitude;
//     let longi = position.coords.longitude;

//     console.log(lat);
//     console.log(longi);
// }

const userTab = document.querySelector("[data-UserWeather]");
const searchTab = document.querySelector("[data-search-Weather]");
const userContainer = document.querySelector(".weather-Container");
const grantAccess = document.querySelector("[data-grantAccess]");
const searchForm = document.querySelector(".form-container");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");
const grantLocationContainer = document.querySelector(".grant-location-container")

let currentTab = userTab;
const API_key = 'a114f4875462007458c92c194a29f0b9';
currentTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(clickedTab){
    if(clickedTab!=currentTab){
        currentTab.classList.remove("current-tab");
        currentTab = clickedTab;
        currentTab.classList.add("current-tab");
        // switching from usertab tp search tab
        if(!searchForm.classList.contains("active")){
            userContainer.classList.remove("active")
            grantLocationContainer.classList.remove("active");
            userInfoContainer.classList.remove("active");
            searchForm.classList.add("active");
        }

        // switching from search tab to user Tab
        else{
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            
            // check locale location cordinates if given , then will show your location
            getfromSessionStorage();
        }
    }
// for switching tabs
}
userTab.addEventListener('click', ()=>{
    switchTab(userTab);
})
searchTab.addEventListener('click',()=>{
    switchTab(searchTab);
})

function getfromSessionStorage(){
    // checks if coordinates are present in session storage
    const localeCoordinates = sessionStorage.getItem("user-coordinates");

    if(!localeCoordinates){
        // if coordinates are not present
        grantLocationContainer.classList.add("active");
    }
    else{
    // if coordinates are present
        const coordinates = JSON.parse(localeCoordinates);
        fetchUserWeatherInfo(coordinates);
        // fethces info according to coordinates

    }
}

async function fetchUserWeatherInfo(coordinates){
    const{lat,lon} = coordinates;
    // make grant location invisible
    grantLocationContainer.classList.remove("active");
    // make loading visible
    loadingScreen.classList.add("active");

    // API call

    try{
        
        const reponse  = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}.34&lon=${lon}.99&appid=${API_key}`)
        const data = await reponse.json();
        console.log(data);

        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);
    }
    catch{
        loadingScreen.classList.remove("active");
        alert('Not able to Fetch data')
    }

}

function renderWeatherInfo(weatherInfo){
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const weatherDesc = document.querySelector("[data-weatherDisc]");
    const weatherIcon = document.querySelector("[weatherIcon]");
    const windSpeed = document.querySelector("[data-windSpeed]");
    const humidity = document.querySelector("[data-Humidity]");
    const clouds = document.querySelector("[data-Clouds]");
    const temp =document.querySelector("[data-temp]");
    
   
    // fetching city name
    cityName.innerText = weatherInfo?.name ;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    weatherDesc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src =  `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    windSpeed.innerText = `${weatherInfo?.wind?.speed}m/s`;
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    clouds.innerText =`${weatherInfo?.clouds?.all}%` ;
    temp.innerText = `${(weatherInfo?.main?.temp - 273.15).toFixed(2)} °C` ;
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log('Geolocation function not available')
    }
}
function showPosition(position){
    let userCoordinates= {
        lat:position.coords.latitude.toFixed(2),
        lon:position.coords.longitude.toFixed(2),
    }
    const locationCoordinates = userCoordinates;
    console.log(locationCoordinates)
    sessionStorage.setItem("user-coordinates", JSON.stringify(locationCoordinates));
    fetchUserWeatherInfo(userCoordinates)
}

grantAccess.addEventListener('click',getLocation());


// search form
const searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    if(searchInput==="") return ;

    fetchSearchWeatherInfo(searchInput.value);
})

async function fetchSearchWeatherInfo(){
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccess.classList.remove("active");
    const city = searchInput.value;

    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");

        renderWeatherInfo(data);

    }
    catch(err){
        alert('not abele to fetch data');
        
    }
}