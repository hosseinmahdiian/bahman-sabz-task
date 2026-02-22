import CryptoJS from "crypto-js";

const SECRET_KEY = process.env.SECRET_KEY;

export const encrypt = (data: any) => {
  const json = JSON.stringify(data);
  return CryptoJS.AES.encrypt(json, String(SECRET_KEY)).toString();
};

export const decrypt = (encrypted: string) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, String(SECRET_KEY));
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decrypted);
};
