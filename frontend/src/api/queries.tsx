import axios from "axios";
import type { LoginForm } from "./auth";

const BACKEND_URL =
  import.meta.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 5000,
});

export async function login_user(data: LoginForm) {
  const response = await api.post("/auth/login/", data);

  return response.data.key;
}

export async function logout_user() {
  const response = await api.post("/auth/logout/", {});

  return response.data;
}

export async function get_user(user: string) {
  const response = await api.get("/auth/user/", {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function location_list(user: string) {
  const response = await api.get("/parking/location/", {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function reservation_list(user: string) {
  const response = await api.get("/parking/reservation/", {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}
