import { reactive, computed } from 'vue';
import WeatherApi from '@/services/WeatherApi';

class WeatherCardC{

	r = {
		weatherWidgetClass:{},
		cardHeader:'',
		location:'',
		weather:{
			stat:'',
			description:'',
			icon:''
		},

		weatherIcon:'',
		tempData:{
			temp:0,
			feelsLike:0
		},
		pressure:'0hPa',
		humidity:0,
		wind:{
			speed:'0m/s'
		},
		visibility:0,

		country:''
	};

	constructor(props) {
		this.r = reactive(this.r);

		this.r.weatherWidgetClass = computed(() => {
			return {
				['WeatherWidget_card']:true,
				['WeatherWidget_card-settings']:props.isSettings
			};
		});

		this.r.cardHeader = computed(() => {
			return props.isSettings ? 'Settings' :  this.r.location +' , ' + this.r.country;
		});
	}

	async getWeatherByCity(locationName){
		const params = {
			units:'metric',
			q:locationName
		};

		const result = await WeatherApi.getData(params, 'weather');

		// ### обработать ошибку

		this.genWeatherData(result.data);
	}

	genWeatherData(data){
		this.r.location = data.name;

		this.r.weather.stat = data.weather[0].main;
		this.r.weather.description = data.weather[0].description;
		this.r.weather.icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

		this.r.tempData.temp = Math.round(data.main.temp);
		this.r.tempData.feelsLike = Math.floor(data.main.feels_like);
		this.r.pressure = Math.floor(data.main.pressure) + 'hPa';
		this.r.humidity = Math.floor(data.main.humidity) + '%';

		this.r.wind.speed = Math.floor(data.wind.speed) + 'm/s';

		this.r.visibility = (data.visibility/1000).toFixed(2) + 'km';

		this.r.country = data.sys.country;
	}

}

export default WeatherCardC;