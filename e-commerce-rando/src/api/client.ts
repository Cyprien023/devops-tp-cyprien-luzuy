const BASE = "http://localhost:3001/api";

export function getToken(): string | null {
    return localStorage.getItem("token");
}

export function setToken(token: string) {
    localStorage.setItem("token", token);
}

export function clearToken() {
    localStorage.removeItem("token");
}

export async function apiFetch<T = unknown>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const res = await fetch(`${BASE}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers ?? {}),
        },
    });
    if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Erreur serveur" }));
        throw new Error(body.error ?? "Erreur inconnue");
    }
    return res.json();
}