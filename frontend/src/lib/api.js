import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const getStats = () => axios.get(`${API}/stats`).then((r) => r.data);

export const getVote = () => axios.get(`${API}/vote`).then((r) => r.data);

export const postVote = (choice) =>
  axios.post(`${API}/vote`, { choice }).then((r) => r.data);

export const getLeaderboard = (search) =>
  axios
    .get(`${API}/leaderboard`, { params: search ? { search } : {} })
    .then((r) => r.data);

export const subscribe = (email) =>
  axios.post(`${API}/subscribe`, { email }).then((r) => r.data);
