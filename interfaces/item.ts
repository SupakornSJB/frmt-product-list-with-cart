import { Item, ItemImage } from "@prisma/client"

export interface IItemsList {
  items: IFullItem[]
}

export type IFullItem = (Omit<Item, "imagesId">) & { images?: ItemImage | undefined };
