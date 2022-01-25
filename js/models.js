import { API_URL } from "./config.js";
import { getData, seperateObjectToArray } from "./helpers.js";

export const loadFromTheApi = async function (apiKey) {
  try {
    const data = await getData(API_URL + `${apiKey}.json`);
    return data
  } catch (err) {
    console.error(`${err}`);
    throw err;
  }
};

export const arrayWithDefinedLength = function(definedLength, array) {
  const newArray = [];
  for (let i=0;i<definedLength;i++) {
    newArray[i] = array[i]
  }

  return newArray
}

// export const sendToApi = async function() {
//   try {
//     const data = await getData()
//   }
// }