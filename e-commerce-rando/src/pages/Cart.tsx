import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { items, removeItem, updateQty, total, count } = useCart();

    const shipping = total >= 200 ? 0 : 9.9;
    const grandTotal = total + shipping;

    return (
        <main className="bg-[#f2efe8] min-h-screen pt-20">
            {/* Header */}
            <div className="px-6 md:px-10 py-8 border-b border-stone-300/60">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="font-['Barlow'] text-[10px] font-medium tracking-[0.22em] uppercase text-stone-400 mb-1">
                            Votre sélection
                        </p>
                        <h1 className="font-['Barlow_Condensed'] font-semibold text-5xl uppercase tracking-tight text-stone-900 leading-none">
                            Panier
                        </h1>
                    </div>
                    {count > 0 && (
                        <span className="font-['Barlow'] text-xs text-stone-400 tracking-widest uppercase">
              {count} article{count > 1 ? "s" : ""}
            </span>
                    )}
                </div>
            </div>

            {items.length === 0 ? (
                /* Empty state */
                <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
                    <p className="font-['Barlow_Condensed'] text-6xl font-semibold text-stone-200 uppercase tracking-tight mb-4">
                        Panier vide
                    </p>
                    <p className="font-['Barlow'] text-sm text-stone-400 mb-8">
                        Vous n'avez pas encore ajouté de pièces à votre sélection.
                    </p>
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-3 bg-stone-900 text-[#f2efe8] px-6 py-3.5 font-['Barlow_Condensed'] font-semibold text-sm tracking-[0.14em] uppercase hover:opacity-75 transition-opacity"
                    >
                        Découvrir la collection
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-[1fr_360px] min-h-[60vh]">
                    {/* Items */}
                    <div className="border-r border-stone-300/60">
                        {items.map((item) => (
                            <div
                                key={`${item.product.id}-${item.size}`}
                                className="flex gap-6 p-6 md:p-8 border-b border-stone-300/60"
                            >
                                {/* Thumbnail */}
                                <Link to={`/product/${item.product.slug}`} className="flex-shrink-0">
                                    <div className="w-24 h-32 md:w-28 md:h-36 overflow-hidden bg-stone-100">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                </Link>

                                {/* Info */}
                                <div className="flex flex-col justify-between flex-1 min-w-0">
                                    <div>
                                        <p className="font-['Barlow'] text-[10px] font-medium tracking-[0.16em] uppercase text-stone-400 mb-1">
                                            {item.product.category}
                                        </p>
                                        <Link to={`/product/${item.product.slug}`}>
                                            <h3 className="font-['Barlow_Condensed'] font-semibold text-2xl uppercase tracking-tight text-stone-900 leading-none hover:text-stone-600 transition-colors">
                                                {item.product.name}
                                            </h3>
                                        </Link>
                                        <p className="font-['Barlow'] text-xs text-stone-400 mt-1 tracking-wide">
                                            {item.product.subtitle}
                                        </p>
                                        <p className="font-['Barlow'] text-xs text-stone-500 mt-1">
                                            Taille : <span className="font-medium">{item.size}</span>
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        {/* Qty */}
                                        <div className="flex items-center border border-stone-300">
                                            <button
                                                onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}
                                                className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors font-['Barlow'] text-lg"
                                            >
                                                −
                                            </button>
                                            <span className="w-8 h-8 flex items-center justify-center font-['Barlow'] text-sm font-medium text-stone-900">
                        {item.qty}
                      </span>
                                            <button
                                                onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}
                                                className="w-8 h-8 flex items-center justify-center text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors font-['Barlow'] text-lg"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* Price + remove */}
                                        <div className="flex items-center gap-4">
                      <span className="font-['Barlow_Condensed'] font-semibold text-xl text-stone-900">
                        {item.product.price * item.qty} €
                      </span>
                                            <button
                                                onClick={() => removeItem(item.product.id, item.size)}
                                                className="font-['Barlow'] text-xs text-stone-400 tracking-widest uppercase hover:text-red-500 transition-colors"
                                            >
                                                Retirer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Continue shopping */}
                        <div className="p-6 md:p-8">
                            <Link
                                to="/shop"
                                className="inline-flex items-center gap-2 font-['Barlow'] text-xs text-stone-400 tracking-widest uppercase hover:text-stone-700 transition-colors"
                            >
                                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                    <path d="M13 7H1M6 2L1 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                Continuer les achats
                            </Link>
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="p-6 md:p-8 sticky top-20 self-start">
                        <p className="font-['Barlow'] text-xs font-medium tracking-[0.18em] uppercase text-stone-700 mb-6">
                            Récapitulatif
                        </p>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between font-['Barlow'] text-sm text-stone-600">
                                <span>Sous-total</span>
                                <span>{total.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between font-['Barlow'] text-sm text-stone-600">
                                <span>Livraison</span>
                                <span>
                  {shipping === 0 ? (
                      <span className="text-[#4e6645] font-medium">Gratuite</span>
                  ) : (
                      `${shipping.toFixed(2)} €`
                  )}
                </span>
                            </div>
                            {shipping > 0 && (
                                <p className="font-['Barlow'] text-[11px] text-stone-400">
                                    Plus que {(200 - total).toFixed(0)} € pour la livraison gratuite
                                </p>
                            )}
                        </div>

                        <div className="border-t border-stone-300/60 pt-4 mb-8">
                            <div className="flex justify-between items-baseline">
                                <span className="font-['Barlow'] text-sm font-medium text-stone-900">Total</span>
                                <span className="font-['Barlow_Condensed'] font-semibold text-3xl text-stone-900">
                  {grandTotal.toFixed(2)} €
                </span>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-stone-900 text-[#f2efe8] font-['Barlow_Condensed'] font-semibold text-sm tracking-[0.16em] uppercase hover:bg-stone-700 transition-colors duration-200 mb-3">
                            Commander
                        </button>

                        <div className="flex flex-col gap-2 mt-6 pt-6 border-t border-stone-300/60">
                            <div className="flex items-center gap-2 font-['Barlow'] text-[11px] text-stone-400">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                                </svg>
                                Paiement 100% sécurisé
                            </div>
                            <div className="flex items-center gap-2 font-['Barlow'] text-[11px] text-stone-400">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/>
                                </svg>
                                Retours gratuits sous 60 jours
                            </div>
                            <div className="flex items-center gap-2 font-['Barlow'] text-[11px] text-stone-400">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                                    <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                                </svg>
                                Livraison express 48h
                            </div>
                        </div>
                    </div>
                </div>
            )}

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