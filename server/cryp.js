const crypto = require("crypto");

// Encrypt data using public key
function encryptWithPublicKey(publicKey, data) {
  return crypto.publicEncrypt(publicKey, Buffer.from(data));
}

// Decrypt data using private key
function decryptWithPrivateKey(privateKey, encryptedData) {
  return crypto.privateDecrypt(privateKey, encryptedData);
}

// Encrypt private key using user's passphrase
function encryptPrivateKey(passphrase, privateKey) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    crypto.createHash("sha256").update(passphrase).digest(),
    iv,
  );
  let encrypted = cipher.update(privateKey);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };
}

// Decrypt private key using user's passphrase
function decryptPrivateKey(passphrase, encryption) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    crypto.createHash("sha256").update(passphrase).digest(),
    Buffer.from(encryption.iv, "hex"),
  );
  let decrypted = decipher.update(Buffer.from(encryption.encryptedData, "hex"));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Usage
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

const encryptedData = encryptWithPublicKey(publicKey, "Some Sensitive Data");
const encryptedPrivateKey = encryptPrivateKey(
  "UserPassphrase",
  privateKey.export({
    type: "pkcs1",
    format: "pem",
  }),
);

const decryptedPrivateKey = decryptPrivateKey(
  "UserPassphrase",
  encryptedPrivateKey,
);
const decryptedData = decryptWithPrivateKey(
  crypto.createPrivateKey({
    key: decryptedPrivateKey,
    type: "pkcs1",
    format: "pem",
  }),
  encryptedData,
);
// console.log("Encrypted Private Key:", encryptedPrivateKey.encryptedData);
// console.log("Encrypted IV:", encryptedPrivateKey.iv);
console.log("Encrypted data:", encryptedData.toString("hex"));
// console.log("Decrypted Data:", decryptedData.toString());
