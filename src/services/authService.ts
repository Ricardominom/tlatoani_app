import * as SecureStore from "expo-secure-store";
import api from "./api";

const TOKEN_KEY = "tlatoani_auth_token";

export async function login(email: string, password: string) {
  const response = await api.post("/v1/auth/login", { email, password });
  const { user, token } = response.data.data;
  await SecureStore.setItemAsync(TOKEN_KEY, token);
  return {
    user,
    token
  };
}

export async function logout(token: string) {
  try {
    await api.post(
      "/v1/auth/logout",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch {}
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function getStoredToken(): Promise<string | null> {
  return SecureStore.getItemAsync(TOKEN_KEY);
}
