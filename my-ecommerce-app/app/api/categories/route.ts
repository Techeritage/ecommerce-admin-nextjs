import { connectToMongoDB } from "@/app/utils/config/mongodb";
import { Category } from "@/app/utils/models/category";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

interface ProductData {
  name: string;
  selectedParent: string;
  properties: string[];
  //images: string[];
}

async function connectToDb() {
  if (!mongoose.connection.readyState) {
    await connectToMongoDB();
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const { name, selectedParent, properties }: ProductData = await req.json();

    const newCategory = new Category({
      name,
      parent: selectedParent,
      properties,
    });
    await newCategory.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "category successfully created",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDb();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const oneCategory = await Category.findById({ _id: id });
      if (!oneCategory) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: oneCategory,
        success: true,
        status: 200,
      });
    } else {
      const allCategories = await Category.find().populate("parent");
      return NextResponse.json({
        status: 200,
        success: true,
        data: allCategories,
      });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to get categories",
      error: error.message,
    });
  }
}

export async function PUT(
  req: NextRequest
) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");


    const { name, selectedParent, properties }: ProductData = await req.json();


    const updatedProduct = await Category.findByIdAndUpdate(
      { _id: id },
      { name, selectedParent, properties }
    );
    if (!updatedProduct) {
      return NextResponse.json({ status: 404, error: "Product not found" });
    }

    return NextResponse.json({ message: "done", status: 200, updatedProduct });
  } catch (error) {
    console.error("Error processing PUT request:", error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deletedProduct = await Category.findByIdAndDelete({ _id: id });
    if (!deletedProduct) {
      return NextResponse.json({ status: 404, message: "Category not found" });
    }

    return NextResponse.json({
      status: 200,
      message: "Category successfully deleted",
      deletedProduct,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to delete categories",
      error: error.message,
    });
  }
}
