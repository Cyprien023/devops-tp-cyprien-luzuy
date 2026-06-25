import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import { apiFetch, setToken, clearToken, getToken } from "../api/client";

type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Restaurer la session au chargement
    useEffect(() => {
        const token = getToken();
        if (!token) {
            setIsLoading(false);
            return;
        }
        apiFetch<{ user: User }>("/auth/me")
            .then((data) => setUser(data.user))
            .catch(() => clearToken())
            .finally(() => setIsLoading(false));
    }, []);

    const login = async (email: string, password: string) => {
        const data = await apiFetch<{ token: string; user: User }>("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        setToken(data.token);
        setUser(data.user);
    };

    const register = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string
    ) => {
        const data = await apiFetch<{ token: string; user: User }>(
            "/auth/register",
            {
                method: "POST",
                body: JSON.stringify({ email, password, firstName, lastName }),
            }
        );
        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        clearToken();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}