import { PostParentCategoryData } from "@/app/lib/definitions";
import { connectToDb } from "@/app/utils/config/mongodb";
import { ParentCategory } from "@/app/utils/models/parentCategory";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();
    const { name, image, bgColor }: PostParentCategoryData = await req.json();

    const newParentCategory = new ParentCategory({
      name,
      image,
      bgColor,
    });
    await newParentCategory.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "parent category successfully created",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to create parent category",
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
      const oneParentCategory = await ParentCategory.findById({ _id: id });
      if (!oneParentCategory) {
        return NextResponse.json(
          { message: "Parent Category not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({
        data: oneParentCategory,
        success: true,
        status: 200,
      });
    } else {
      const allParentCategories = await ParentCategory.find();
      return NextResponse.json({
        status: 200,
        success: true,
        data: allParentCategories,
      });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to get parent categories",
      error: error.message,
    });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const { name, bgColor, image }: PostParentCategoryData = await req.json();

    const updatedParentCategory = await ParentCategory.findByIdAndUpdate(
      { _id: id },
      { name, bgColor, image }
    );
    if (!updatedParentCategory) {
      return NextResponse.json({
        status: 404,
        error: "Parent category not found",
      });
    }

    return NextResponse.json({
      message: "done",
      status: 200,
      updatedParentCategory,
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

    const deletedParentCategory = await ParentCategory.findByIdAndDelete({
      _id: id,
    });
    if (!deletedParentCategory) {
      return NextResponse.json({
        status: 404,
        message: "Parent Category not found",
      });
    }

    return NextResponse.json({
      status: 200,
      message: "Category successfully deleted",
      deletedParentCategory,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to delete parent category",
      error: error.message,
    });
  }
}
