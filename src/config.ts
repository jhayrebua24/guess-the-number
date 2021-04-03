import axios from "axios";
import { ISubmitGuess, ISubmitFinal } from "components/interface";

export const API = process.env.REACT_APP_API_URL || "http://localhost";
export const applicantId = process.env.REACT_APP_APPLICANT_ID || "applicant-id";
export const authToken = process.env.REACT_APP_AUTH_TOKEN || "";

export const axiosConfig = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Basic ${authToken}`,
  },
};
/**
 * fetch gameId from the api
 * @return {Promise} Promise
 */
export const fetchNewGameId = (): Promise<any> =>
  axios.post(`${API}/game`, { applicantId }, axiosConfig);
/**
 * submit guess number to the API
 * @return {Promise} Promise
 */
export const submitGuess = (payload: ISubmitGuess): Promise<any> =>
  axios.put(`${API}/game`, { ...payload, applicantId }, axiosConfig);

/**
 * submit for application
 * @return {Promise} Promise
 */
export const submitApplication = (payload: ISubmitFinal): Promise<any> =>
  axios.post(
    `${API}/submit-application`,
    { ...payload, applicantId },
    axiosConfig
  );
