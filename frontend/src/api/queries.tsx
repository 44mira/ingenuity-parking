import axios from "axios";

const BACKEND_URL = import.meta.env.BACKEND_URL ?? "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1000,
});

export async function location_list() {
  const response = await api.get("/api/v1/location");

  return response.data;
}
