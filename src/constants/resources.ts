// export const apiUrl = "${api}/api/getAllFirestoreDocs";
export const apiUrl = "http://localhost:5000";
export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export let radioUrl = "https://stream.zeno.fm/y3udqcuic5otv";

getLocalStorage("radio").then((res: any) => {
  if (res && res.recordedAudio) {
    radioUrl = res.recordedAudio;
  }
});

// remove Special Characters And Replace Spaces
export function sanitizedString(text: string) {
  // Use a regular expression to match special characters and spaces
  const regex = /[^a-zA-Z0-9\s]/g;

  // Replace special characters with an empty string and spaces with hyphens
  const sanitizedString = text.replace(regex, "").replace(/\s+/g, "-");

  return sanitizedString;
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Comprehensive email validation regex
  return emailRegex.test(email);
}


// THE FOLLOWING FUNCTIONS ARE USED FOR LOCAL STORAGE
export async function setLocalStorage(storageKey: string, value: any) {
  const encryptedvalue = btoa(escape(JSON.stringify(value)));
  return await localStorage.setItem(storageKey, encryptedvalue);
}

export async function getLocalStorage(storageKey: string) {
  return new Promise((resolve) => {
    const localData = localStorage.getItem(storageKey);
    if (localData) {
      resolve(JSON.parse(unescape(atob(localData))));
    } else {
      resolve(false);
    }
  });
}

export async function removeLocalStorageItem(storageKey: string) {
  await localStorage.removeItem(storageKey);
}

export async function clearLocalStorage() {
  await localStorage.clear();
}
