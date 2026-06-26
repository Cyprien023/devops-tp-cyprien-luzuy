import { useState, type FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = (location.state as any)?.from ?? "/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#f2efe8] min-h-screen flex flex-col">
            {/* Top bar */}
            <div className="px-6 md:px-10 py-5 border-b border-stone-300/60">
                <Link
                    to="/"
                    className="font-['Barlow_Condensed'] font-semibold text-lg tracking-[0.2em] uppercase text-stone-900"
                >
                    Summit<span className="opacity-40">Gear</span>
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center px-6 py-16">
                <div className="w-full max-w-sm">
                    {/* Header */}
                    <p className="font-['Barlow'] text-[10px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-2">
                        Accès compte
                    </p>
                    <h1 className="font-['Barlow_Condensed'] font-semibold text-4xl uppercase tracking-tight text-stone-900 leading-none mb-8">
                        Connexion
                    </h1>

                    {/* Redirect message */}
                    {location.state?.from && (
                        <div className="mb-6 px-4 py-3 bg-stone-100 border border-stone-200 text-xs font-['Barlow'] text-stone-600 tracking-wide">
                            Connectez-vous pour accéder à cette page.
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-500 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="vous@exemple.com"
                                className="w-full px-4 py-3 bg-white border border-stone-300 font-['Barlow'] text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-500">
                                    Mot de passe
                                </label>
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-white border border-stone-300 font-['Barlow'] text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
                            />
                        </div>

                        {/* Error */}
                        {error && (
                            <p className="font-['Barlow'] text-xs text-red-600 tracking-wide">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 w-full py-4 bg-stone-900 text-[#f2efe8] font-['Barlow_Condensed'] font-semibold text-sm tracking-[0.16em] uppercase transition-opacity duration-200 hover:opacity-75 disabled:opacity-40"
                        >
                            {loading ? "Connexion…" : "Se connecter"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-stone-200" />
                        <span className="font-['Barlow'] text-[10px] tracking-widest uppercase text-stone-400">
              ou
            </span>
                        <div className="flex-1 h-px bg-stone-200" />
                    </div>

                    <p className="font-['Barlow'] text-sm text-stone-500 text-center">
                        Pas encore de compte ?{" "}
                        <Link
                            to="/register"
                            className="text-stone-900 font-medium underline underline-offset-2 hover:opacity-60 transition-opacity"
                        >
                            Créer un compte
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}