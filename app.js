window.addEventListener('load', () => {
    let lon;
    let lat;
    let tempDescription = document.querySelector('.temp-description');
    let tempDegree = document.querySelector('.temp-degree');
    let localTimezone = document.querySelector('.local-timezone');
    let temperature = document.querySelector('.temperature');
    const tempSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3edd5871d63a9aa8b7573bf980399ac4`;
            fetch(api).then(response => {
                return response.json();
            }).then(data => {
                const { description, icon } = data.weather[0];
                const { temp } = data.main;

                tempDegree.textContent = temp;
                tempDescription.textContent = description;
                localTimezone.textContent = data.name;


                //Formula for C, F
                let celsius = Math.floor((temp - 273.15));
                let fahrenheit = Math.floor(((temp - 273.15) * 9 / 5 + 32));
                //Change C,F,K
                temperature.addEventListener('click', () => {
                    if (tempSpan.textContent === 'F') {
                        tempSpan.textContent = 'C';
                        tempDegree.textContent = celsius + ' °';
                    } else if (tempSpan.textContent === 'C') {
                        tempSpan.textContent = 'K';
                        tempDegree.textContent = temp + ' °';
                    } else {
                        tempSpan.textContent = 'F';
                        tempDegree.textContent = fahrenheit + ' °';
                    }
                })
                setIcons(icon, document.querySelector('.icon'));
            })
        })


    }

    function setIcons(icon,) {
        var skycons = new Skycons({ "color": "white" });
        skycons.set("icon", Skycons.CLEAR_DAY);
        skycons.set("icon", Skycons.CLEAR_NIGHT);
        skycons.set("icon", Skycons.PARTLY_CLOUDY_DAY);
        skycons.set("icon", Skycons.PARTLY_CLOUDY_NIGHT);
        skycons.set("icon", Skycons.CLOUDY);
        skycons.set("icon", Skycons.RAIN);
        skycons.set("icon", Skycons.SLEET);
        skycons.set("icon", Skycons.SNOW);
        skycons.set("icon", Skycons.WIND);
        skycons.set("icon", Skycons.FOG);

        switch (icon) {
            case "01d":
                skycons.add(document.getElementById("icon"), Skycons.CLEAR_DAY);
                break;
            case "01n":
                skycons.add(document.getElementById("icon"), Skycons.CLEAR_NIGHT);
                break;
            case "02d":
                skycons.add(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_DAY);
                break;
            case "02n":
                skycons.add(document.getElementById("icon"), Skycons.PARTLY_CLOUDY_NIGHT);
                break;
            case "03d":
                skycons.add(document.getElementById("icon"), Skycons.CLOUDY);
                break;
            case "09d":
                skycons.add(document.getElementById("icon"), Skycons.RAIN);
                break;
            case "13d":
                skycons.add(document.getElementById("icon"), Skycons.SNOW);
                break;
            case "50d":
                skycons.add(document.getElementById("icon"), Skycons.FOG);
                break;

            default:

        }

        skycons.play();

    } setIcons();

})