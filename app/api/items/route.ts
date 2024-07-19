export const dynamic = "force-dynamic"

import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { IItemsList } from "@/interfaces/item";

export async function GET(): Promise<NextResponse<IItemsList>> {
  const allItems = await prisma.item.findMany();
  const allImages = await Promise.all(
    allItems.map(async (item) => await prisma.itemImage.findFirst({ where: { id: item.imagesId } }))
  )

  const response = {
    items: allItems.map((item) => {
      const images = allImages.find((img) => img?.id === item.imagesId);

      if (images) return {
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        images: images
      }

      return {
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
      }
    })
  }

  return NextResponse.json(response);
}
