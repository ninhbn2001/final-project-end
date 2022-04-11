require('dotenv').config()

export const env = {
    MONGODB_URI: process.env.MONGOBD_URI,
    DATABASE_NAME: process.env.DATABASE_NAME,
    HOST: process.env.HOST,
    PORT: process.env.PORT
}