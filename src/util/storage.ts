import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: "TesaPayStore"
});


export const customEncrypt = (value: string) => {
    let encryptedValue = btoa(value);
    for (let i = 0; i < 11; i++) {
        encryptedValue = btoa(encryptedValue);
    }

    return encryptedValue;
}

export const customDecrypt = (encrypted: string) => {
    let decryptedValue = atob(encrypted);
    for (let i = 0; i < 11; i++) {
        decryptedValue = atob(decryptedValue);
    }

    return decryptedValue;
}



// THE FOLLOWING FUNCTIONS ARE USED FOR LOCAL STORAGE
export function setLocalStorage(storageKey: string, value: any) {
    const lowLevelEncryption = btoa(JSON.stringify(value));
    storage.set(storageKey, lowLevelEncryption);
}

export function getLocalStorage(storageKey: string) {
    const storedData = storage.getString(storageKey);
    const storedValue = storedData ? JSON.parse(atob(storedData)) : null;
  
    return storedValue;
}

export function removeLocalStorageItem(storageKey: string) {
    storage.delete(storageKey);
}
  
export function clearLocalStorage() {
    storage.clearAll()
}
  

// THE FOLLOWING FUNCTIONS ARE USED FOR SESSION STORAGE
export async function setSessionStorage(storageKey: string, value: any) {
    const encryptedvalue = btoa(escape(JSON.stringify(value)));
    return await sessionStorage.setItem(storageKey, encryptedvalue);
}
  
export function getSessionStorage(storageKey: string) {
    return new Promise((resolve) => {
        const localData = sessionStorage.getItem(storageKey);
        if (localData) {
            resolve(JSON.parse(unescape(atob(localData))));
        } else {
            resolve(false);
        }
    });
}
  
export async function removeSessionStorageItem(storageKey: string) {
    await sessionStorage.removeItem(storageKey);
}
  
export async function clearSessionStorage() {
    await sessionStorage.clear();
}
  