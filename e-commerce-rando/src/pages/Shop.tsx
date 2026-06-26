import { Link } from "react-router-dom";
import { products } from "../data/products";
import React from "react";

export default function Shop() {
    return (
        <main className="bg-[#f2efe8] min-h-screen pt-20">
            {/* Header */}
            <div className="px-6 md:px-10 py-10 border-b border-stone-300/60">
                <p className="font-['Barlow'] text-[10px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-2">
                    Édition 2026
                </p>
                <div className="flex items-end justify-between">
                    <h1 className="font-['Barlow_Condensed'] font-semibold text-5xl md:text-7xl uppercase tracking-tight text-stone-900 leading-none">
                        Collection
                    </h1>
                    <span className="font-['Barlow'] text-xs text-stone-400 tracking-widest uppercase">
            {products.length} pièces
          </span>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3">
                {products.map((product, i) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        className={`group block border-r border-stone-300/60 last:border-r-0 ${
                            i < products.length - 1 ? "" : ""
                        }`}
                    >
                        {/* Image */}
                        <div className="relative overflow-hidden aspect-[3/4] bg-stone-100">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                            />
                            <img
                                src={product.imageDetail}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

                            {/* Category badge */}
                            <div className="absolute top-4 left-4">
                <span className="bg-[#f2efe8]/90 backdrop-blur-sm text-stone-700 text-[10px] font-['Barlow'] font-medium tracking-[0.12em] uppercase px-2.5 py-1">
                  {product.category}
                </span>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-6 border-t border-stone-300/60">
                            <p className="font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-1">
                                {product.subtitle}
                            </p>
                            <div className="flex items-baseline justify-between">
                                <h2 className="font-['Barlow_Condensed'] font-semibold text-2xl uppercase tracking-tight text-stone-900">
                                    {product.name}
                                </h2>
                                <span className="font-['Barlow_Condensed'] font-semibold text-xl text-stone-900">
                  {product.price} €
                </span>
                            </div>

                            {/* Animated underline */}
                            <div className="mt-4 h-px bg-stone-200 relative overflow-hidden">
                                <div className="absolute inset-y-0 left-0 w-0 bg-stone-800 group-hover:w-full transition-all duration-500 ease-out" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer */}
            <footer className="px-6 md:px-10 py-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-stone-300/60 mt-10">
        <span className="font-['Barlow_Condensed'] font-semibold text-base tracking-[0.2em] uppercase text-stone-400">
          Summit<span className="text-stone-900">Gear</span>
        </span>
                <div className="flex gap-8 font-['Barlow'] text-xs text-stone-400 tracking-widest uppercase">
                    <span>Livraison gratuite dès 200€</span>
                    <span>Retours 60 jours</span>
                    <span>Garantie 3 ans</span>
                </div>
            </footer>
        </main>
    );
}