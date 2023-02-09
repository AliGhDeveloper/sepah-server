import mongoose from 'mongoose';
import env from 'dotenv';
env.config();
 
export default function dbConnection() {
    if(mongoose.connections[0].readyState) {
        return console.log('already connected to database!')
    } else {
        mongoose.connect(process.env.DB_URL, (e) => {
            if(e) return console.log(e);
            return console.log('connected to database!')
        })
    }
}