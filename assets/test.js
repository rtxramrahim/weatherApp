function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        console.log('Geolocation function not available')
    }
}
function showPosition(position){
    const userCoordinates= {
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    }
    console.log(userCoordinates)
    // sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    // fetchUserWeatherInfo(userCoordinates)
}
