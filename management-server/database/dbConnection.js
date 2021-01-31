import mongoose from 'mongoose';
import config from 'config';
// TODO logger


let dbConnection;

let getDBConnection = async () => {
	try {
		let connectionOptions = {
			user: process.env.JOJO_MONGODB_USER,
			pass: process.env.JOJO_MONGODB_PASSWORD,
			dbName: process.env.JOJO_MONGODB_DB,
			useNewUrlParser: config.get('mongodb_settings.use_new_url_parser'),
			useCreateIndex: config.get('mongodb_settings.use_create_index'),
			useUnifiedTopology: config.get('mongodb_settings.use_unified_topology')

		}

		// Establish a mongoose connection to  mongodb
		dbConnection = await mongoose.connect(process.env.JOJO_MONGODB_URI,
			connectionOptions, (error) => {
				if (error) {
					console.log('db connect error ', error);
					// TODO logger
				}
				console.log('MongoDB connection was successful', error);

			}
		)
	} catch (error) {
		//  TODO logger
	}
	return dbConnection;
}

// Exporting the connection
export default dbConnection = () => getDBConnection();
