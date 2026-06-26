import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/auth";

const router = Router();
const prisma = new PrismaClient();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, passwordHash: hash, firstName, lastName },
  });
  // Créer le panier vide
  await prisma.cart.create({ data: { userId: user.id } });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email, firstName, lastName } });
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ error: "Identifiants incorrects" });
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, email, firstName: user.firstName } });
});

router.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: (req as any).userId },
    select: { id: true, email: true, firstName: true, lastName: true },
  });
  if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });
  res.json({ user });
});

export default router;
