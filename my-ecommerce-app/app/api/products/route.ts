import { ProductData } from "@/app/lib/definitions";
import { connectToDb } from "@/app/utils/config/mongodb";
import Product from "@/app/utils/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDb();

    // Extract product data from request body
    const {
      name,
      description,
      price,
      images,
      subcategory,
      tag,
    }: ProductData = await req.json();

    // Create a new product (replace with your product creation logic)
    const newProduct = new Product({
      name,
      description,
      price,
      images,
      subcategory,
      tag,
    });
    await newProduct.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "product successfully created",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const query = (req.nextUrl.searchParams.get("query") as string) || "";
    if (query) {
      const filteredProducts = await Product.find({
        name: { $regex: new RegExp(query, "i") },
      });
      return NextResponse.json({
        status: 200,
        success: true,
        data: filteredProducts,
      });
    } else {
      const allProducts = await Product.find();
      return NextResponse.json({
        status: 200,
        success: true,
        data: allProducts,
      });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
}
