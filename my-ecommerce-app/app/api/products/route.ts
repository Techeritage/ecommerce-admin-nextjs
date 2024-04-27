import { connectToMongoDB } from "@/app/utils/config/mongodb"; // Adjust path as needed
import Product from "@/app/utils/models/product";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

//property type
interface PropertiesData {
  name: string;
  value: string;
}

//data type
interface ProductData {
  name: string;
  description: string;
  price: number;
  images: string[];
  subcategory: string;
  tag: string;
}

//modifying mongoose connect
async function connectToDb() {
  if (!mongoose.connection.readyState) {
    await connectToMongoDB();
  }
}

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
