import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Categories from "@/models/Categories";

export async function GET(req, res) {
  await connectToDB();

  if (true) {
    const newCategory = new Categories({
      name: "test",
      content: [],
    });

    try {
      await newCategory.save();
      return NextResponse.json({ message: "Category crée !" });
    } catch (e) {
      console.log(e)
      return NextResponse.json({ message: `Il y a une erreur: ${e}` });
    }
  }
}