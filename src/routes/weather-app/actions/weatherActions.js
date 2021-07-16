import variables from '../../../../.env.js';
import dateformat from 'dateformat';

const transformWeatherData = (weather) => {
    return weather.list.map((item, index) => {
        const data = {};
        const date = new Date(item.dt * 1000);
        const iconUrl = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;

        data.date = dateformat(date, "mmm dS, yyyy, h TT");
        data.id = index;
        data.iconUrl = iconUrl;
        data.desc = item.weather[0].description;
        data.temp = item.main.temp;
        data.min = item.main.temp_min;
        data.max = item.main.temp_max;

        return data;
    });
};

export const getWeather = async (city) => {

    const baseURL = variables.API_WEATHER_URL;
	const API_KEY = variables.API_WEATHER_KEY;

    let items = [];
    let cityFound = 'paris';

    const params = {
        q: city,
        units: 'metric',
    };

    const queryString = new URLSearchParams({
        ...params,
        appid: API_KEY,
    });
    const url = `${baseURL}?${queryString}`; 

    if(city?.length) {
        try {
            //console.log('url', url);
            const res = await fetch(url);
            if (res.ok) {
                try {
                    const weather = await res.json(); 
                    items = transformWeatherData(weather);
                    cityFound = city;
                    // console.log(items);
                    return {city, cityFound, items};

                } catch (error) {
                    console.log(error);
                    return null;
                }
            }

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}