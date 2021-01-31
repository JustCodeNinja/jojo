// Envrioment and config
import dotenv from 'dotenv';
// Standard Express and Node Server Imports
import express from 'express';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from "morgan";
import helmet from 'helmet';
import compression from 'compression'
import cors from 'cors';
import config from 'config';

// // Babel imports, even though they aren't directly referenced, they need to be here
// import babelCore from 'babel-core/register';
// import babelPolyfill from 'babel-polyfill';


// Database connection imports
import db from './database/dbConnection.js';

dotenv.config();

/************************************************************* */
// Establish database connection
db();


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(compression());

/************************************************************* */

// To Allow cross origin requests originating from selected origins
var corsOptions = {
	origin: config.get('allowed_origins'),
	methods: ['GET, POST, OPTIONS, PUT, DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
}

app.use(cors(corsOptions));



/************************************************************** */

app.use('/', (req, res) => {
	res.status(200).send('hello');
})




// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
})



app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = res.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
})

// PORT
const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`app is running in ${PORT}`);
})