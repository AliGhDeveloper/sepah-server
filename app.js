import { ApolloServer } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers/resolvers.js'
import { typeDefs } from './graphql/types/types.js';
import dbConnection from './utils/db-connection.js';
import dotenv from 'dotenv';
import uploadImage from './middlewares/uploadImage.js';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log(__dirname);

dotenv.config();

const app = express();

app.use(cors()); 
app.use(bodyParser())
app.use(express.static(__dirname + '/'));
app.use('/bower_components',  express.static(path.join(__dirname, '../bower_components')));
app.use(bodyParser.urlencoded({ extended: false }));
 
app.use('/image_upload', uploadImage)


const server = new ApolloServer({
    typeDefs,
    resolvers
});

await server.start();

server.applyMiddleware({ app });


const port = process.env.PORT

app.listen(port || 4000, (err) => {
    if(err) return console.log(err);
    return console.log(`listening to port ${port || 4000}`)
})
