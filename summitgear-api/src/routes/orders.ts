import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

router.post("/", requireAuth, async (req, res) => {
  const userId = (req as any).userId;
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });
  if (!cart || cart.items.length === 0) return res.status(400).json({ error: "Panier vide" });

  const totalCents = cart.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  const order = await prisma.order.create({
    data: {
      userId,
      totalCents,
      items: {
        create: cart.items.map((i) => ({
          productId: i.productId,
          productName: i.product.name,
          size: i.size,
          qty: i.qty,
          unitPriceCents: i.product.price,
        })),
      },
    },
    include: { items: true },
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  res.json(order);
});

router.get("/", requireAuth, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: (req as any).userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(orders);
});

export default router;
