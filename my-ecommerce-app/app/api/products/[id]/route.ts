import { connectToMongoDB } from "@/app/utils/config/mongodb";
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

async function connectToDb() {
  if (!mongoose.connection.readyState) {
    await connectToMongoDB();
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();
    const { id } = params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: product, success: true, status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDb();

    const { id } = params;

    const { name, price, description, images, subcategory, tag }: ProductData = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: id },
      { name, description, images, price, subcategory, tag }
    );
    if (!updatedProduct) {
      return NextResponse.json({ status: 404, error: "Product not found" });
    }

    return NextResponse.json({ message: "done", status: 200, updatedProduct });
  } catch (error) {
    console.error("Error processing PUT request:", error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ status: 404, message: "Missing product ID" });
  }

  try {
    await connectToDb();

    const deletedProduct = await Product.findByIdAndDelete({ _id: id });
    if (!deletedProduct) {
      return NextResponse.json({ status: 404, message: "Product not found" });
    }

    return NextResponse.json({
      status: 200,
      message: "Product successfully deleted",
      deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
