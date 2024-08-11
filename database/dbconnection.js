import pkg from 'pg'
import dotenv from 'dotenv';
const {Client} = pkg;
dotenv.config();
const client = new Client({
    host: process.env.API_HOST_NAME,
    user: process.env.API_USER_NAME,
    port: process.env.API_PORT_NAME,
    password: process.env.API_PASSWORD,
    database: process.env.API_DATABASE
})

export default client;