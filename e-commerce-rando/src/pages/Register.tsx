import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirm: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        if (form.password !== form.confirm) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
        if (form.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }
        setLoading(true);
        try {
            await register(form.email, form.password, form.firstName, form.lastName);
            navigate("/", { replace: true });
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
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
                    <p className="font-['Barlow'] text-[10px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-2">
                        Nouveau client
                    </p>
                    <h1 className="font-['Barlow_Condensed'] font-semibold text-4xl uppercase tracking-tight text-stone-900 leading-none mb-8">
                        Créer un compte
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Prénom / Nom */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-500 mb-2">
                                    Prénom
                                </label>
                                <input
                                    type="text"
                                    value={form.firstName}
                                    onChange={set("firstName")}
                                    required
                                    placeholder="Jean"
                                    className="w-full px-4 py-3 bg-white border border-stone-300 font-['Barlow'] text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-500 mb-2">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    value={form.lastName}
                                    onChange={set("lastName")}
                                    required
                                    placeholder="Dupont"
                                    className="w-full px-4 py-3 bg-white border border-stone-300 font-['Barlow'] text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-500 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={set("email")}
                                required
                                placeholder="vous@exemple.com"
                                className="w-full px-4 py-3 bg-white border border-stone-300 font-['Barlow'] text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-500 mb-2">
                                Mot de passe <span className="text-stone-300">(min. 8 caractères)</span>
                            </label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={set("password")}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-white border border-stone-300 font-['Barlow'] text-sm text-stone-900 placeholder-stone-300 focus:outline-none focus:border-stone-600 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-500 mb-2">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                value={form.confirm}
                                onChange={set("confirm")}
                                required
                                placeholder="••••••••"
                                className={`w-full px-4 py-3 bg-white border font-['Barlow'] text-sm text-stone-900 placeholder-stone-300 focus:outline-none transition-colors
                  ${form.confirm && form.confirm !== form.password
                                    ? "border-red-300 focus:border-red-500"
                                    : "border-stone-300 focus:border-stone-600"
                                }`}
                            />
                        </div>

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
                            {loading ? "Création…" : "Créer mon compte"}
                        </button>
                    </form>

                    <div className="my-8 flex items-center gap-4">
                        <div className="flex-1 h-px bg-stone-200" />
                        <span className="font-['Barlow'] text-[10px] tracking-widest uppercase text-stone-400">ou</span>
                        <div className="flex-1 h-px bg-stone-200" />
                    </div>

                    <p className="font-['Barlow'] text-sm text-stone-500 text-center">
                        Déjà un compte ?{" "}
                        <Link
                            to="/login"
                            className="text-stone-900 font-medium underline underline-offset-2 hover:opacity-60 transition-opacity"
                        >
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}