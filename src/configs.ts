//import dotenv and export all env variables from here
import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce',
    REDIS_URI: process.env.REDIS_URI || 'redis://localhost:6379',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN
}