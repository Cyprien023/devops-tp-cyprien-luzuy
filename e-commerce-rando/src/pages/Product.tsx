import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function Product() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { addItem } = useCart();

    const product = products.find((p) => p.slug === slug);

    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [activeImage, setActiveImage] = useState<"main" | "detail">("main");
    const [added, setAdded] = useState(false);
    const [sizeError, setSizeError] = useState(false);

    if (!product) {
        return (
            <main className="bg-[#f2efe8] min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <p className="font-['Barlow_Condensed'] text-4xl font-semibold text-stone-300 uppercase mb-4">
                        Produit introuvable
                    </p>
                    <Link to="/shop" className="font-['Barlow'] text-sm text-stone-500 underline">
                        Retour à la collection
                    </Link>
                </div>
            </main>
        );
    }

    const others = products.filter((p) => p.id !== product.id);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true);
            return;
        }
        addItem(product, selectedSize);
        setAdded(true);
        setSizeError(false);
        setTimeout(() => setAdded(false), 2500);
    };

    return (
        <main className="bg-[#f2efe8] min-h-screen pt-20">
            {/* Breadcrumb */}
            <div className="px-6 md:px-10 py-4 border-b border-stone-300/60">
                <div className="flex items-center gap-2 font-['Barlow'] text-xs text-stone-400 tracking-widest uppercase">
                    <Link to="/" className="hover:text-stone-700 transition-colors">Accueil</Link>
                    <span>/</span>
                    <Link to="/shop" className="hover:text-stone-700 transition-colors">Collection</Link>
                    <span>/</span>
                    <span className="text-stone-700">{product.name}</span>
                </div>
            </div>

            {/* Product layout */}
            <div className="grid md:grid-cols-2 min-h-[80vh]">
                {/* Images */}
                <div className="relative bg-stone-100">
                    {/* Main image */}
                    <div className="sticky top-20 aspect-square md:aspect-auto md:h-[calc(100vh-5rem)] overflow-hidden">
                        <img
                            src={activeImage === "main" ? product.image : product.imageDetail}
                            alt={product.name}
                            className="w-full h-full object-cover transition-opacity duration-500"
                        />
                    </div>

                    {/* Thumbnail switcher */}
                    <div className="absolute bottom-6 left-6 flex gap-2">
                        <button
                            onClick={() => setActiveImage("main")}
                            className={`w-12 h-12 border-2 overflow-hidden transition-all duration-200 ${
                                activeImage === "main" ? "border-stone-900" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                        >
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </button>
                        <button
                            onClick={() => setActiveImage("detail")}
                            className={`w-12 h-12 border-2 overflow-hidden transition-all duration-200 ${
                                activeImage === "detail" ? "border-stone-900" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                        >
                            <img src={product.imageDetail} alt="" className="w-full h-full object-cover" />
                        </button>
                    </div>
                </div>

                {/* Product info */}
                <div className="flex flex-col p-8 md:p-14 border-l border-stone-300/60">
                    <div className="flex-1">
                        <p className="font-['Barlow'] text-[10px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-3">
                            {product.category}
                        </p>
                        <h1 className="font-['Barlow_Condensed'] font-semibold text-5xl md:text-6xl uppercase tracking-tight text-stone-900 leading-none mb-2">
                            {product.name}
                        </h1>
                        <p className="font-['Barlow'] text-sm text-stone-400 tracking-wide mb-6">
                            {product.subtitle}
                        </p>
                        <p className="font-['Barlow_Condensed'] font-semibold text-4xl text-stone-900 mb-8">
                            {product.price} €
                        </p>

                        <p className="font-['Barlow'] text-sm text-stone-600 leading-relaxed mb-8 border-t border-stone-300/60 pt-8">
                            {product.description}
                        </p>

                        {/* Size selector */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-3">
                <span className="font-['Barlow'] text-xs font-medium tracking-[0.14em] uppercase text-stone-700">
                  Taille
                    {selectedSize && (
                        <span className="ml-2 text-stone-400">— {selectedSize}</span>
                    )}
                </span>
                                <span className="font-['Barlow'] text-xs text-stone-400 tracking-wide underline cursor-pointer">
                  Guide des tailles
                </span>
                            </div>
                            <div className="grid grid-cols-6 gap-2">
                                {SIZES.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => { setSelectedSize(size); setSizeError(false); }}
                                        className={`py-2.5 text-xs font-['Barlow'] font-medium tracking-wide border transition-all duration-150
                      ${selectedSize === size
                                            ? "bg-stone-900 text-[#f2efe8] border-stone-900"
                                            : "bg-transparent text-stone-700 border-stone-300 hover:border-stone-600"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {sizeError && (
                                <p className="mt-2 font-['Barlow'] text-xs text-red-600 tracking-wide">
                                    Veuillez sélectionner une taille
                                </p>
                            )}
                        </div>

                        {/* Add to cart */}
                        <button
                            onClick={handleAddToCart}
                            className={`w-full py-4 font-['Barlow_Condensed'] font-semibold text-sm tracking-[0.16em] uppercase transition-all duration-300 mb-3
                ${added
                                ? "bg-[#4e6645] text-[#f2efe8]"
                                : "bg-stone-900 text-[#f2efe8] hover:bg-stone-700"
                            }`}
                        >
                            {added ? "✓ Ajouté au panier" : "Ajouter au panier"}
                        </button>

                        {added && (
                            <button
                                onClick={() => navigate("/cart")}
                                className="w-full py-3.5 font-['Barlow_Condensed'] font-semibold text-sm tracking-[0.16em] uppercase border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-[#f2efe8] transition-all duration-200"
                            >
                                Voir le panier →
                            </button>
                        )}

                        {/* Details */}
                        <div className="mt-10 border-t border-stone-300/60 pt-8">
                            <p className="font-['Barlow'] text-xs font-medium tracking-[0.16em] uppercase text-stone-700 mb-4">
                                Caractéristiques
                            </p>
                            <ul className="space-y-2.5">
                                {product.details.map((detail) => (
                                    <li key={detail} className="flex items-start gap-3 font-['Barlow'] text-sm text-stone-600">
                                        <span className="text-stone-300 mt-0.5">—</span>
                                        {detail}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tags */}
                        <div className="mt-8 flex flex-wrap gap-2">
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
                </div>
            </div>

            {/* Other products */}
            <section className="border-t border-stone-300/60">
                <div className="px-6 md:px-10 py-8 border-b border-stone-300/60">
                    <p className="font-['Barlow_Condensed'] font-semibold text-2xl uppercase tracking-tight text-stone-900">
                        Compléter le système
                    </p>
                </div>
                <div className="grid grid-cols-2">
                    {others.map((p) => (
                        <Link
                            key={p.id}
                            to={`/product/${p.slug}`}
                            className="group block border-r border-stone-300/60 last:border-r-0"
                        >
                            <div className="relative overflow-hidden aspect-[4/3] bg-stone-100">
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-6 border-t border-stone-300/60 flex items-baseline justify-between">
                                <div>
                                    <p className="font-['Barlow'] text-[10px] text-stone-400 tracking-widest uppercase mb-0.5">{p.category}</p>
                                    <h3 className="font-['Barlow_Condensed'] font-semibold text-xl uppercase tracking-tight text-stone-900">
                                        {p.name}
                                    </h3>
                                </div>
                                <span className="font-['Barlow_Condensed'] font-semibold text-lg text-stone-900">{p.price} €</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Footer */}
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