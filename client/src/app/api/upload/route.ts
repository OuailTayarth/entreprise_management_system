"use server";

import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/s3";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "no file provided" }, { status: 404 });
    }

    const ImageFileExtension = file.name.split(".").pop();
    const key = `EmployeesPhotos/${uuidv4()}_profile.${ImageFileExtension}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await uploadImage({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });
  } catch (error) {
    console.error("Error uploading file", error);
    return NextResponse.json(
      {
        error: "Failed to upload file",
      },
      { status: 500 },
    );
  }
}
