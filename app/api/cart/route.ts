export const dynamic = "force-dynamic";

import { ISubmitCart } from "@/interfaces/cart";
import { isValidBody } from "@/utils/reqTypeGuard";
import prisma from "@/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!isValidBody<ISubmitCart>(body, ["items"])) {
    return;
  }

  const cart = await prisma.cart.create({});
  await prisma.cartItems.createMany({
    data: body.items.map((item) => ({ itemId: item.id, amount: item.amount, cartId: cart.id }))
  });

  return NextResponse.json({ status: 200 });
}
