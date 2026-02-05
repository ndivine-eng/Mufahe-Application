import { api } from "./api";

export type AuthUser = {
  id: string;
  name: string;
  emailOrPhone: string;
};

export async function loginUser(payload: {
  emailOrPhone: string;
  password: string;
}) {
  const res = await api.post("/auth/login", payload);
  return res.data as {
    ok: boolean;
    message: string;
    user: AuthUser;
    token: string;
  };
}

export async function registerUser(payload: {
  name: string;
  emailOrPhone: string;
  password: string;
}) {
  const res = await api.post("/auth/register", payload);
  return res.data as {
    ok: boolean;
    message: string;
    user: AuthUser;
    token: string;
  };
}
