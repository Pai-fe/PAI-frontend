import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
  APP_URL: process.env.REACT_APP_API_URL,
  REACT_APP_TOKEN_CODE: process.env.REACT_APP_TOKEN_CODE
};