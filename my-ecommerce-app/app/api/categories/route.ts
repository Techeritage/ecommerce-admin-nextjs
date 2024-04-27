import { PostProductData } from "@/app/lib/definitions";
import { connectToDb } from "@/app/utils/config/mongodb";
import { SubCategory } from "@/app/utils/models/category";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const { name, selectedParent }: PostProductData = await req.json();

    const newCategory = new SubCategory({
      name,
      parent: selectedParent,
    });
    await newCategory.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Subcategory successfully created",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to create subategory",
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
      const oneSubcategory = await SubCategory.findById({ _id: id });
      if (!oneSubcategory) {
        return NextResponse.json(
          { message: "Subcategory not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: oneSubcategory,
        success: true,
        status: 200,
      });
    } else {
      const allSubcategories = await SubCategory.find().populate('parent');
      return NextResponse.json({
        status: 200,
        success: true,
        data: allSubcategories,
      });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to get subcategories",
      error: error.message,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const { name, selectedParent }: PostProductData = await req.json();

    const updatedSubcategory = await SubCategory.findByIdAndUpdate(
      { _id: id },
      { name, parent: selectedParent }
    );
    if (!updatedSubcategory) {
      return NextResponse.json({ status: 404, error: "Subcategory not found" });
    }

    return NextResponse.json({
      message: "done",
      status: 200,
      updatedSubcategory,
    });
  } catch (error) {
    console.error("Error processing PUT request:", error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deletedSubcategory = await SubCategory.findByIdAndDelete({ _id: id });
    if (!deletedSubcategory) {
      return NextResponse.json({
        status: 404,
        message: "Subcategory not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Subcategory successfully deleted",
      deletedSubcategory,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to delete subcategory",
      error: error.message,
    });
  }
}
