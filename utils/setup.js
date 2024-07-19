import { addItemsToDB } from "@/utils/addToDb";
const jsonItem = require("./../public/data.json");

addItemsToDB(jsonItem);
