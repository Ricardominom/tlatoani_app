import { createContext, useContext, useEffect, useState } from "react";

interface AuthUser {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthState>({} as AuthState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // getStoredToken().then((savedToken) => {
    //   setToken(savedToken);
    //   setIsLoading(false);

    //DEMO MODE
    setIsLoading(false);
    // });
  }, []);

  async function login(email: string, password: string) {
    //DEMO MODE
    setToken("demo-token");
    setUser({
      id: 1,
      name: "Ricardo Mino",
      email: email || "demo@tlatoani.com"
    });

    //descomentar para acceder a la conexion con API
    // const data = await loginService(email, password);
    // setToken(data.token);
    // setUser(data.user);
  }

  async function logout() {
    // if (token) await logoutService(token);

    //DEMO MODE
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
