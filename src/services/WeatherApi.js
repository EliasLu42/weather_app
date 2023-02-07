import axios from 'axios';

class WeatherApi {

	static apiPathWearher = 'https://api.openweathermap.org/data/2.5/weather';
//	static apiPathReverseLocation = 'https://api.openweathermap.org/geo/1.0/reverse';
	static apiPathDirectLocation = 'https://api.openweathermap.org/geo/1.0/direct';
	static apiKey = 'a6c655d34b9b2fbb40bee2426ebee399';

	static async getData(params, dataType){
		if(
			typeof(params) !== 'object' ||
			Array.isArray(params) ||
			params === null
		) throw new Error('Parameter "values" mast be Map Object');


		params.appId = WeatherApi.apiKey;

		let apiPath = '';
		switch(dataType){
			case 'weather':
				apiPath = WeatherApi.apiPathWearher;

				break;
			default:
				throw new Error('Error type of data');
		}

		const result = {
			data:{}
		}
		try {
			const response = await axios.get(apiPath, {params:params});
			result.data = response.data;

		}catch (e){
			result.error = e;
		}

		return result;
	}

}

export default WeatherApi;