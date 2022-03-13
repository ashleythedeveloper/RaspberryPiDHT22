const database = require('./controllers/database');
const DHT22 = require('node-dht-sensor');


const createRecord = async (temperature, humidity) => {
	const date = new Date();
	const timestamp = date.toISOString();

	try {
		const SaveData = await database.SaveMyGardenData(temperature, humidity, timestamp);

	} catch (error) {
		return console.log(error);
	}
}


const readData = setInterval(() => {
	DHT22.read(22, 16, (err, temp, humidity) => {
		if (!err) {
			console.log(`Temp: ${temp.toFixed(2)}C, Humidity: ${humidity.toFixed(2)}%`);
			createRecord(temp.toFixed(2), humidity.toFixed(2))
		} else {
			console.log(err);
		}
	});
}, 5000)




