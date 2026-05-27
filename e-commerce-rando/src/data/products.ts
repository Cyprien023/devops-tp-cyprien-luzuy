export type Product = {
    id: number;
    slug: string;
    name: string;
    subtitle: string;
    price: number;
    category: string;
    tags: string[];
    description: string;
    details: string[];
    image: string;
    imageDetail: string;
};

export const products: Product[] = [
    {
        id: 1,
        slug: "jacket-alpine-pro",
        name: "Jacket Alpine Pro",
        subtitle: "Gore-Tex 3L · 820g",
        price: 489,
        category: "Veste",
        tags: ["Gore-Tex Pro", "3 couches", "imperméable", "capuche ajustable"],
        description:
            "Conçue pour les conditions alpines les plus exigeantes. La Jacket Alpine Pro allie protection maximale et liberté de mouvement grâce à sa membrane Gore-Tex Pro 3 couches et sa coupe anatomique.",
        details: [
            "Membrane Gore-Tex Pro 3L",
            "Imperméabilité : 30 000 mm colonne d'eau",
            "Coutures entièrement thermocollées",
            "Capuche compatible casque, ajustable en 3 points",
            "4 poches extérieures zippées YKK",
            "Poids : 820g (taille M)",
        ],
        image: "/blouson1.png",
        imageDetail: "/blouson2.png",
    },
    {
        id: 2,
        slug: "trail-pants-wide",
        name: "Trail Pants Wide",
        subtitle: "Ripstop nylon · DWR durable",
        price: 245,
        category: "Pantalon",
        tags: ["DWR", "Ripstop", "ceinture intégrée", "multi-poches"],
        description:
            "Le pantalon trail pensé pour l'approche et la montagne. Coupe wide-leg inspirée des arts martiaux, matière ripstop ultra-légère et traitement DWR pour résister aux averses.",
        details: [
            "Tissu ripstop nylon 70D",
            "Traitement DWR C0 (sans PFAS)",
            "Ceinture à boucle crantée intégrée",
            "6 poches dont 2 cargo zippées",
            "Panneaux bi-stretch aux genoux",
            "Poids : 340g (taille M)",
        ],
        image: "/pantalon1.png",
        imageDetail: "/pantalon2.png",
    },
    {
        id: 3,
        slug: "merino-base-layer",
        name: "Merino Base Layer",
        subtitle: "Polartec Power Dry · zip 1/4",
        price: 165,
        category: "Couche de base",
        tags: ["Polartec", "anti-odeur", "thermorégulation", "zip 1/4"],
        description:
            "La première couche qui fait tout bien. Construction bi-matière avec panneaux Polartec Power Dry ultra-respirants et faces lisse pour glisser sous les couches. Zip 1/4 pour ventiler rapidement.",
        details: [
            "Face avant : Polartec Power Dry",
            "Panneaux : jersey stretch bi-directionnel",
            "Propriétés anti-odeur naturelles",
            "Oeillets de pouce intégrés",
            "Zip YKK 1/4 avec tirette sans anneau",
            "Poids : 210g (taille M)",
        ],
        image: "/baselayer1.png",
        imageDetail: "/baselayer2.png",
    },
];