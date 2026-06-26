import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import React from "react";

const categories = ["Tout", "Vestes", "Pantalons", "Doudounes", "Couche de base", "Couche intermédiaire"];

export default function ProductGrid() {
    const [active, setActive] = useState("Tout");

    const filtered =
        active === "Tout"
            ? products
            : products.filter((p) => p.category === active);

    return (
        <section className="min-h-screen bg-stone-50 pt-24 pb-16">
            {/* Header */}
            <div className="px-6 md:px-12 mb-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <p className="text-xs font-['Barlow'] font-medium tracking-[0.2em] uppercase text-stone-400 mb-2">
                            Collection 2026
                        </p>
                        <h1 className="font-['Barlow_Condensed'] font-semibold text-5xl text-stone-900 tracking-tight uppercase leading-none">
                            Équipement<br />
                            <span className="text-stone-400">Technique</span>
                        </h1>
                    </div>
                    <p className="text-stone-400 text-xs font-['Barlow'] tracking-wider">
                        {filtered.length} produit{filtered.length > 1 ? "s" : ""}
                    </p>
                </div>

                {/* Filter bar */}
                <div className="mt-8 flex flex-wrap gap-2 border-b border-stone-200 pb-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActive(cat)}
                            className={`pb-3 px-1 text-xs font-['Barlow'] font-medium tracking-[0.1em] uppercase transition-all duration-200 border-b-2 -mb-px
                ${
                                active === cat
                                    ? "border-stone-900 text-stone-900"
                                    : "border-transparent text-stone-400 hover:text-stone-700"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <div className="px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-0">
                    {filtered.map((p, i) => (
                        <div
                            key={p.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
                        >
                            <ProductCard product={p} />
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="py-24 text-center text-stone-400 text-sm font-['Barlow'] tracking-widest uppercase">
                        Aucun produit dans cette catégorie
                    </div>
                )}
            </div>
        </section>
    );
}