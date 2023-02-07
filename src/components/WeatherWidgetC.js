import { reactive, toRefs, watch, computed } from 'vue';
import WeatherApi from '@/services/WeatherApi';

class WeatherWidgetC{

	r = {
		settingsOpened:0,
		settingsOpenerClass:{},
		presetLocations:[],
		errorMessage:''
	};

	#rRefs;

	constructor() {
		this.r = reactive(this.r);

		this.r.settingsOpenerClass = computed(() => {
			return {
				['WeatherWidget_settingsOpener']:true,
				['WeatherWidget_settingsOpener-opened']:this.r.settingsOpened
			};
		});

		this.r.presetLocations = JSON.parse(localStorage.getItem('weather_widget_locations'));

		if(!this.r.presetLocations || !this.r.presetLocations.length){
			this.r.presetLocations = [];

			navigator.geolocation.getCurrentPosition(async (pos) => {
				const params = {
					units:'metric',
					lat:pos.coords.latitude,
					lon:pos.coords.longitude
				};

				const result = await WeatherApi.getData(params, 'weather');
				this.r.presetLocations.push({
					id:result.data.id,
					name:result.data.name
				});

				this.updateLocalStorage();
			});
		}

		this.#rRefs = toRefs(this.r);
		watch(this.#rRefs.presetLocations.value, () => this.updateLocalStorage());
	}

	updateLocalStorage(){
		localStorage.setItem('weather_widget_locations', JSON.stringify(this.r.presetLocations));
	}

	setNewLocationPosition = (params) => {
		const locationData = this.r.presetLocations.find((location) => location.id === params.locationId);
		const currentIndex = this.r.presetLocations.findIndex((location) => location.id === params.locationId);

		if(params.index === 0) params.index = 1;
		this.r.presetLocations.splice(currentIndex, 1);
		this.r.presetLocations.splice(params.index - 1, 0, locationData);
	}

	addLocation = async (locationName) => {
		const locationAdded = this.r.presetLocations.find((location) => location.name === locationName);

		if(locationAdded){
			this.r.errorMessage = 'This location has already been added';

			return;
		}

		const params = {
			q:locationName,
		};
		const result = await WeatherApi.getData(params, 'weather');
		const error = result.error;

		if(error){
			this.r.errorMessage = error.response.data.message;

			return;
		}

		this.r.errorMessage = '';
		this.r.presetLocations.push({
			id:result.data.id,
			name:result.data.name
		});
	}

	deleteLocation = (locationName) => {
		const elementI = this.r.presetLocations.indexOf(locationName);
		this.r.presetLocations.splice(elementI, 1);
	}

	switchOpenerSettings = () => {
		this.r.errorMessage = '';

		this.r.settingsOpened = !this.r.settingsOpened;
	}

}

export default WeatherWidgetC;