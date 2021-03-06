import axios from "axios";
import { CONFIG } from "./config";

export const axiosHelperCall = async(method, url, body, additionalHeaders = {}) => {
  console.log('ja sam sada tu', body);
  let storageToken = localStorage.getItem(CONFIG.REACT_APP_TOKEN_CODE);
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