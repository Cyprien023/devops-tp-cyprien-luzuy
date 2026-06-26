import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// GET /api/cart
router.get("/", requireAuth, async (req, res) => {
  const cart = await prisma.cart.findUnique({
    where: { userId: (req as any).userId },
    include: { items: { include: { product: true } } },
  });
  res.json(cart);
});

// POST /api/cart/items
router.post("/items", requireAuth, async (req, res) => {
  const { productId, size, qty } = req.body;
  const cart = await prisma.cart.findUnique({ where: { userId: (req as any).userId } });
  const item = await prisma.cartItem.upsert({
    where: { cartId_productId_size: { cartId: cart!.id, productId, size } },
    update: { qty: { increment: qty } },
    create: { cartId: cart!.id, productId, size, qty },
  });
  res.json(item);
});

// DELETE /api/cart/items/:itemId
router.delete("/items/:itemId", requireAuth, async (req, res) => {
  await prisma.cartItem.delete({ where: { id: String(req.params.itemId) } });
  res.json({ ok: true });
});

export default router;
