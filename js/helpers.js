import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getData = async (url, uploadData = undefined) => {
  try {
    const fetchData = uploadData
      ? fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!data) throw new Error(`Fetch error! ${data.message}${res.stat}`);
    else return data;
  } catch (err) {
    throw err;
  }
};

export const seperateObjectToArray = (object) => {
  const newArray = [];
  const keys = Object.keys(object);
  keys.forEach((key) => {
    newArray.push(object[key]);
  });
  return newArray;
};

export const getParamValue = (name) => {
  const location = decodeURI(window.location.toString());
  const index = location.indexOf("?") + 1;
  const substrings = location.substring(index, location.length);
  const splitedSubstring = substrings.split("=");
  return splitedSubstring[1]
}


export const checkValueExisting = function(object) {
  const keys = Object.keys(object);
  let bool_flag = true

  keys.forEach(key => {
      if (!object[key]) {
          bool_flag = false;
      }
  });

  if (bool_flag) return true
  else return false
}

export const sortCouresArray = async(nonSortedArray) => {
  const sortedArray = nonSortedArray.sort((i, j) => j.prosecnaOcena - i.prosecnaOcena)
  return sortedArray
};
