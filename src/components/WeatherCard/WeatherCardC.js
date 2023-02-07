import { reactive, computed } from 'vue';
import WeatherApi from '@/services/WeatherApi';

class WeatherCardC{

	r = {
		params:[],
		temp:0,
		weatherWidgetClass:{},
		cardHeader:'',
		location:'',
		weatherIcon:'',
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

		this.r.params.push({
			name:'Feels like',
			value:Math.floor(data.main.feels_like)
		});

		this.r.params.push({
			name:data.weather[0].main,
			value:data.weather[0].description
		});

		this.r.params.push({
			value:Math.floor(data.wind.speed) + 'm/s',
			iconName:'wind'
		});

		this.r.params.push({
			value:Math.floor(data.main.pressure) + 'hPa',
			iconName:'pressure'
		});

		this.r.params.push({
			name:'Humidity',
			value:Math.floor(data.main.humidity) + '%'
		});

		this.r.params.push({
			name:'Visibility',
			value:(data.visibility/1000).toFixed(2) + 'km'
		});

		this.r.weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
		this.r.temp = Math.round(data.main.temp);
		this.r.country = data.sys.country;
	}

}

export default WeatherCardC;