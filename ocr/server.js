import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import { OCR } from './ocr.js';
import { encryptWithPublicKey } from './encrypt.js'
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 6970

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

app.post('/ocr', upload.single('citizenship'), async(req, res) => {

  const citizenship = req.file;
  const userId = req.body.userId;
  const iv = req.body.iv;
  const decryptionKey = req.body.decryptionKey;
  // let publicKey = req.body.publicKey; //length 4096
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
  });
  
  const receiveData = await OCR(citizenship.buffer);
  
  const encryptedData = encryptWithPublicKey(publicKey, JSON.stringify(receiveData)).toString("hex");
  
  const apiUrl = process.env.SERVER_URL + "/onboard/verify";
  const headers = {
    'x-api-key': process.env.API_KEY,
    'Content-Type': 'application/json',
  };
  const sendData = {
    userId: userId,
    decryptionKey: decryptionKey,
    iv: iv,
    encryptedData: encryptedData,
  };
  // console.log('API Request:', sendData)    
  const response = await axios.patch(apiUrl, sendData, { headers });

  if (!isAuthorized()) {
    res.status(401).send('Unauthorized');
    return;
  }
  res.status(200).send("Authorized");

  let GetResponse = await fetch("https://server-p7.samrid.me/claims/types");
  let data = await GetResponse.json();

  let claims = {
    "Above 21": false,
    "Nepali Citizen": true,
    "Verified": true
  }
  
  if(getAge(receiveData.dateOfBirth) < 21){
    claims["Above 21"] = false;
  }
  else{
    claims["Above 21"] = true;
  }
  
  const requests = data.claimTypes.map(item => {
    let temp = {
      userId: userId,
      claimTypeId: item.id,
      value: claims[item.name]
    };
    const claimsUrl = process.env.SERVER_URL + "/claims/add";
    axios.post(claimsUrl, JSON.stringify(temp), { headers }).then(console.log).catch(console.log);
  });
  
});


function isAuthorized(){
  return true;
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
