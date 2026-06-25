import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

router.get("/:slug", async (req, res) => {
    const product = await prisma.product.findUnique({
        where: { slug: req.params.slug },
    });
    if (!product) return res.status(404).json({ error: "Produit introuvable" });
    res.json(product);
});

export default router;