import express from 'express';
import multer from 'multer';
import { OCR } from './ocr.js';
import { encryptWithPublicKey } from './encrypt.js'
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 6969;

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post('/ocr', upload.single('citizenship'), async(req, res) => {


  const citizenship = req.file;
  const userId = req.body.userId;
  const iv = req.body.iv;
  const decryptionKey = req.body.decryptionKey;
  let publicKey = req.body.publicKey; //length 4096
  
  const receiveData = await OCR(citizenship.buffer);
  
  const encryptedData = encryptWithPublicKey(publicKey, JSON.stringify(receiveData)).toString("hex");
  
    const apiUrl = process.env.SERVER_URL + "/onboard/verify";
    const headers = {
      'x-api-key': "InternalKey@1234",
    };
    const sendData = {
      userId: userId,
      decryptionKey: decryptionKey,
      iv: iv,
      encryptedData: encryptedData,
    };
    console.log('API Request:', sendData)    
    const response = await axios.patch(apiUrl, sendData, { headers });

    console.log('API Response:', response.data);

    if (!isAuthorized()) {
      res.status(401).send('Unauthorized');
      return;
    }

    res.status(200).send("Authorized");
});

function isAuthorized(){
  return true;
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
