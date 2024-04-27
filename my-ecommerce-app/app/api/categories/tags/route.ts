import { PostTagData } from "@/app/lib/definitions";
import { connectToDb } from "@/app/utils/config/mongodb";
import { Tag } from "@/app/utils/models/tag";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDb();

    const { name }: PostTagData = await req.json();
    const newTag = new Tag({
      name,
    });
    await newTag.save();

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Tag successfully created",
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to create tag",
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
      const oneTag = await Tag.findById({ _id: id });
      if (!oneTag) {
        return NextResponse.json({ message: "Tag not found" }, { status: 404 });
      }

      return NextResponse.json({
        data: oneTag,
        success: true,
        status: 200,
      });
    } else {
      const allTags = await Tag.find();
      return NextResponse.json({
        status: 200,
        success: true,
        data: allTags,
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

export async function PUT(
  req: NextRequest
) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");


    const { name }: PostTagData = await req.json();


    const updatedTag = await Tag.findByIdAndUpdate(
      { _id: id },
      { name }
    );
    if (!updatedTag) {
      return NextResponse.json({ status: 404, error: "Tag not found" });
    }

    return NextResponse.json({ message: "done", status: 200, updatedTag });
  } catch (error) {
    console.error("Error processing PUT request:", error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const deletedTag = await Tag.findByIdAndDelete({ _id: id });
    if (!deletedTag) {
      return NextResponse.json({ status: 404, message: "Tag not found" });
    }

    return NextResponse.json({
      status: 200,
      message: "Tag successfully deleted",
      deletedTag,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      status: 500,
      success: false,
      message: "Failed to delete tag",
      error: error.message,
    });
  }
}