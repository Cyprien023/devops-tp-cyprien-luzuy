import { Link } from "react-router-dom";
import { products } from "../data/products";
import React from "react";

export default function Home() {
    return (
        <main className="bg-[#f2efe8]">
            {/* Hero — full viewport, dark, atmospheric */}
            <section className="relative h-screen flex flex-col justify-end overflow-hidden bg-[#141a12]">
                {/* Background image mosaic */}
                <div className="absolute inset-0 grid grid-cols-3">
                    <div
                        className="col-span-2 bg-cover bg-center opacity-60"
                        style={{ backgroundImage: "url(/blouson1.png)", backgroundSize: "cover" }}
                    />
                    <div className="flex flex-col">
                        <div
                            className="flex-1 bg-cover bg-center opacity-50"
                            style={{ backgroundImage: "url(/pantalon1.png)", backgroundSize: "cover" }}
                        />
                        <div
                            className="flex-1 bg-cover bg-center opacity-50"
                            style={{ backgroundImage: "url(/baselayer1.png)", backgroundSize: "cover" }}
                        />
                    </div>
                </div>

                {/* Dark gradient bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141a12] via-[#141a12]/40 to-transparent" />

                {/* Hero content */}
                <div className="relative z-10 px-6 md:px-10 pb-16 md:pb-20">
                    <p className="font-['Barlow'] text-[11px] font-medium tracking-[0.25em] uppercase text-[#8a9e80] mb-4">
                        Collection Altitude 2026
                    </p>
                    <h1 className="font-['Barlow_Condensed'] font-semibold text-[clamp(3rem,8vw,7rem)] leading-[0.92] uppercase text-[#f2efe8] mb-8 tracking-tight">
                        Fait pour<br />
                        <span className="text-[#4e6645]">les sommets.</span><br />
                        Conçu pour durer.
                    </h1>
                    <div className="flex gap-4 items-center">
                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-3 bg-[#f2efe8] text-[#141a12] px-6 py-3.5 font-['Barlow_Condensed'] font-semibold text-sm tracking-[0.14em] uppercase transition-opacity duration-200 hover:opacity-80"
                        >
                            Voir la collection
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </Link>
                        <span className="text-[#8a9e80] font-['Barlow'] text-xs tracking-widest">3 pièces · édition limitée</span>
                    </div>
                </div>
            </section>

            {/* Intro strip */}
            <section className="px-6 md:px-10 py-12 border-b border-stone-300/60">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-6xl">
                    <p className="font-['Barlow_Condensed'] text-3xl font-semibold text-stone-800 uppercase tracking-tight leading-tight max-w-lg">
                        Trois pièces. Un système.<br />
                        <span className="text-stone-400">Du départ au sommet.</span>
                    </p>
                    <p className="font-['Barlow'] text-sm text-stone-500 leading-relaxed max-w-xs">
                        Chaque pièce est pensée pour fonctionner seule ou en système de couches. Matières certifiées, fabrication éthique.
                    </p>
                </div>
            </section>

            {/* Product showcase — alternating layout */}
            <section>
                {products.map((product, i) => (
                    <div
                        key={product.id}
                        className={`grid md:grid-cols-2 border-b border-stone-300/60 group`}
                    >
                        {/* Image — swaps side each product */}
                        <div
                            className={`relative overflow-hidden aspect-square md:aspect-auto min-h-[50vh] ${
                                i % 2 === 1 ? "md:order-2" : ""
                            }`}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-[1.03] group-hover:opacity-0"
                            />
                            <img
                                src={product.imageDetail}
                                alt={`${product.name} détail`}
                                className="absolute inset-0 w-full h-full object-cover scale-[1.03] opacity-0 transition-all duration-700 ease-in-out group-hover:scale-100 group-hover:opacity-100"
                            />
                        </div>

                        {/* Info */}
                        <div
                            className={`flex flex-col justify-between p-8 md:p-14 bg-[#f2efe8] ${
                                i % 2 === 1 ? "md:order-1" : ""
                            }`}
                        >
                            <div>
                                <p className="font-['Barlow'] text-[10px] font-medium tracking-[0.2em] uppercase text-stone-400 mb-3">
                                    {product.category}
                                </p>
                                <h2 className="font-['Barlow_Condensed'] text-5xl md:text-6xl font-semibold uppercase tracking-tight text-stone-900 leading-none mb-3">
                                    {product.name}
                                </h2>
                                <p className="font-['Barlow'] text-sm text-stone-400 tracking-wide mb-6">
                                    {product.subtitle}
                                </p>
                                <p className="font-['Barlow'] text-sm text-stone-600 leading-relaxed mb-8 max-w-sm">
                                    {product.description}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {product.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="font-['Barlow'] text-[10px] font-medium tracking-[0.1em] uppercase px-2.5 py-1 border border-stone-300 text-stone-500"
                                        >
                      {tag}
                    </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-end justify-between">
                                <Link
                                    to={`/product/${product.slug}`}
                                    className="inline-flex items-center gap-3 bg-stone-900 text-[#f2efe8] px-6 py-3.5 font-['Barlow_Condensed'] font-semibold text-sm tracking-[0.14em] uppercase transition-opacity duration-200 hover:opacity-75"
                                >
                                    Voir le produit
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </Link>
                                <p className="font-['Barlow_Condensed'] text-3xl font-semibold text-stone-900">
                                    {product.price} €
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* Footer strip */}
            <footer className="px-6 md:px-10 py-10 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-stone-300/60">
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