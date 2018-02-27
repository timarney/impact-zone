import axios from "axios";
import jwt from "jsonwebtoken";

export const api_host = process.env.REACT_APP_API_HOST;
const _id = process.env.REACT_APP_BEARER_ID;
const name = process.env.REACT_APP_BEARER_NAME;

function bearer() {
  const signature = {
    _id,
    name
  };

  const token = jwt.sign(signature, "ozma");

  if (token) {
    return {
      headers: { Authorization: "Bearer" + token }
    };
  }

  return {};
}

export async function getLocation(locationId) {
  const url = `${api_host}/locations/${locationId}`;

  return await axios
    .get(url, {}, bearer())
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}

export async function getAccount(uId) {
  const url = `${api_host}/accounts/${uId}`;

  return await axios
    .get(url, {}, bearer())
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}