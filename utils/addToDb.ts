import prisma from "@/prisma/db"

export interface IItemFromJson extends IItem {
  image: IItemImages,
}

export interface IItem {
  name: string,
  category: string,
  price: number;
}

export interface IItemImages {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export const addJsonItemsToDB = (jsonString: string) => addItemsToDB(JSON.parse(jsonString));

export const addItemsToDB = async (items: IItemFromJson[]) => {
  await Promise.all(
    items.map(async (item) => {
      const image = await prisma.itemImage.create({ data: { ...item.image } });
      if (!image) throw ("Write Error");
      const newItem: IItem = {
        name: item.name,
        category: item.category,
        price: item.price,
      }
      await prisma.item.create({ data: { ...newItem, imagesId: image.id } })
    })
  )
}

module.exports = {
  addItemsToDB,
  addJsonItemsToDB
}
