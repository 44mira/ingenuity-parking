import axios from "axios";
import type { LoginForm } from "./auth";

const BACKEND_URL =
  import.meta.env.BACKEND_URL ?? "http://127.0.0.1:8000/api/v1";

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 1000,
});

export async function login_user(data: LoginForm) {
  const response = await api.post("/auth/login/", data);
  return response;
}

export async function logout_user() {
  let response;
  try {
    response = await api.post("/auth/logout/", {});
  } catch (e) {
    console.log(e);
  }

  return response.data;
}

export async function location_list(user: string) {
  const response = await api.get("/parking/location/", {
    headers: {
      Authorization: `Bearer ${user}`,
    },
  });

  return response.data;
}
