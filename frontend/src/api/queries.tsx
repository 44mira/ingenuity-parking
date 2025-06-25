import axios from "axios";
import type { LoginForm } from "./auth";
import type { locationForm } from "@/components/LocationForm";
import type { reservationForm } from "@/components/ReservationForm";

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

export async function location_delete(user: string, id: number) {
  const response = await api.delete(`/parking/location/${id}/`, {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function location_create(user: string, data: locationForm) {
  const response = await api.post(`/parking/location/`, data, {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function location_update(
  user: string,
  data: locationForm,
  id: string,
) {
  const response = await api.put(`/parking/location/${id}`, data, {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function location_detail(user: string, id: string) {
  const response = await api.get(`/parking/location/${id}`, {
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

export async function reservation_delete(user: string, id: number) {
  const response = await api.delete(`/parking/reservation/${id}/`, {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function reservation_cancel(user: string, id: number) {
  const response = await api.post(
    `/parking/reservation/${id}/cancel/`,
    {},
    {
      headers: {
        Authorization: `Token ${user}`,
      },
    },
  );

  return response.data;
}

export async function reservation_create(user: string, data: reservationForm) {
  const response = await api.post(`/parking/reservation/`, data, {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function reservation_update(
  user: string,
  data: reservationForm,
  id: string,
) {
  const response = await api.put(`/parking/reservation/${id}`, data, {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function reservation_detail(user: string, id: string) {
  const response = await api.get(`/parking/reservation/${id}`, {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}

export async function user_list(user: string) {
  const response = await api.get("/parking/user/", {
    headers: {
      Authorization: `Token ${user}`,
    },
  });

  return response.data;
}
