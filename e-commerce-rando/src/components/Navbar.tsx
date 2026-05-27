import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const location = useLocation();
    const { count } = useCart();

    const isHome = location.pathname === "/";

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
                isHome ? "mix-blend-difference" : "bg-[#f2efe8] border-b border-stone-200"
            }`}
        >
            <div className="flex items-center justify-between px-6 md:px-10 py-5">
                <Link
                    to="/"
                    className={`font-['Barlow_Condensed'] font-semibold text-lg tracking-[0.2em] uppercase ${
                        isHome ? "text-white" : "text-stone-900"
                    }`}
                >
                    Summit<span className="opacity-40">Gear</span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link
                        to="/shop"
                        className={`text-xs font-['Barlow'] font-medium tracking-[0.14em] uppercase transition-opacity duration-200
              ${isHome ? "text-white" : "text-stone-900"}
              ${location.pathname === "/shop" ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                    >
                        Collection
                    </Link>
                    <Link
                        to="/cart"
                        className={`text-xs font-['Barlow'] font-medium tracking-[0.14em] uppercase transition-opacity duration-200 flex items-center gap-2
              ${isHome ? "text-white" : "text-stone-900"}
              ${location.pathname === "/cart" ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                    >
                        Panier
                        {count > 0 && (
                            <span
                                className={`rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-semibold
                  ${isHome ? "bg-white text-black" : "bg-stone-900 text-white"}`}
                            >
                {count}
              </span>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
    );
}