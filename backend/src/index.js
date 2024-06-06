import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { S3Client } from "@aws-sdk/client-s3";
import { FileManager } from './utils/FileManager.js';
import { masking } from './utils/Masking.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(bodyParser.json());
app.use(cors()); // Allow CORS for all origins

// Create an S3 client object with region and credentials
const credentials = {
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
};
const s3Client = new S3Client({ region: 'us-east-1', credentials });
const bucketName = 'app1auth-12345'; 

// API#1: Register a User 
app.post('/user/register', async(req, res) => {
 let reqBody = req.body;
 try{
  const fileName = masking( req.body?.email );
  const fileManager = new FileManager(s3Client);
  console.log("fileName: ", fileName+'.json');
  await fileManager.uploadFile(bucketName, fileName+'.json', JSON.stringify(req.body) );
 } catch (error) {
    console.error(`Error: ${error}`);
 }
 res.json(reqBody);
});

// API#2: User Login Authentication
app.post('/user/login', async(req, res) => { 
 let data = '';
 let response = {
    status : 'NOT_MATCHED',
    message: 'Password doesn\'t Match'
 }
 try{
    const fileName = masking( req.body?.email );
    const fileManager = new FileManager(s3Client);
    console.log("fileName: ", fileName+'.json');
    data = await fileManager.readFile(bucketName, fileName+'.json');
    data = JSON.parse(data);
    if(req.body.pwd === data?.pwd) {
        response.status= 'MATCHED';
        response.message = 'Password Matched';
        response.data = data;
    }
 } catch (error) {
    response.status='ERROR';
    response.message = error.message;
    console.error(`Error: ${error}`);
 }
  res.json(response);
});

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});