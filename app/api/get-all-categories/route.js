import Categories from "@/models/Categories";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req, res) {
  await connectToDB();

  try {
    const categories = await Categories.find();
    return NextResponse.json({ data: categories });
  } catch (error) {
    return NextResponse.json({
      message: "Impossible de recuperer les projets",
    });
  }
}

