import React from "react";
import useEncrypt from "./useEncrypt";

const useLocalStorage = () => {
    const { encryptData, decryptData } = useEncrypt();

    const setStorage = (key, data, encrypted = false) => {
        if (encrypted) {
            data = encryptData(data)
        }
        localStorage.setItem(key, data);
    }


    const getStorage = (key, encrypted = false) => {
        let data = localStorage.getItem(key)
        if (encrypted && data) {
            data = decryptData(data)
        }
        return data
    }

    const removeStorage = (key) => {
        localStorage.removeItem(key)
    }

    return { setStorage, getStorage, removeStorage }
}

export default useLocalStorage;


