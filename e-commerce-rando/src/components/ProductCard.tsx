import { Link } from "react-router-dom";
import { type Product } from "../data/products";
import React from "react";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link to={`/product/${product.id}`} className="group block relative">
            {/* Image container */}
            <div className="relative overflow-hidden bg-stone-100 aspect-[3/4]">
                {/* Primary image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out
                     group-hover:opacity-0 group-hover:scale-105"
                />
                {/* Hover image */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 ease-in-out
                     group-hover:opacity-100 group-hover:scale-100"
                />

                {/* Dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

                {/* Category badge */}
                <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-stone-800 text-[10px] font-['Barlow'] font-medium tracking-[0.1em] uppercase px-2.5 py-1 rounded-sm">
            {product.category}
          </span>
                </div>

                {/* Tags revealed on hover */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {product.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-['Barlow'] font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded-sm"
                        >
              {tag}
            </span>
                    ))}
                </div>
            </div>

            {/* Info row */}
            <div className="pt-3 pb-6 px-0.5">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <p className="text-sm font-['Barlow'] font-medium text-stone-900 leading-tight">
                            {product.name}
                        </p>
                        <p className="text-xs font-['Barlow'] text-stone-400 mt-0.5 tracking-wide">
                            {product.subtitle}
                        </p>
                    </div>
                    <p className="text-sm font-['Barlow_Condensed'] font-semibold text-stone-900 tracking-wide whitespace-nowrap">
                        {product.price} €
                    </p>
                </div>

                {/* Animated underline */}
                <div className="mt-3 h-px bg-stone-200 relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-0 bg-stone-800 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
            </div>
        </Link>
    );
}