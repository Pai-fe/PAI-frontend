import axios from "axios";

export const axiosHelperCall = async(method, url, body, additionalHeaders = {}) => {
  let storageToken = localStorage.getItem("Bearer");
  return await axios({
      method: method,
      url: url,
      data: body,
      headers:{
          ...additionalHeaders,
          'Authorization': storageToken
      }
  });
}