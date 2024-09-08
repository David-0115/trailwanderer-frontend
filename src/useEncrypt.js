import React from "react";
import CryptoJS from 'crypto-js';
const KEY = import.meta.env.VITE_SECRET_KEY


const useEncrypt = () => {


    const encryptData = (data, secretKey = KEY) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    };

    const decryptData = (cipherText, secretKey = KEY) => {
        const data = CryptoJS.AES.decrypt(cipherText, secretKey);
        const decryptedData = data.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    };

    return { encryptData, decryptData }
}


export default useEncrypt;