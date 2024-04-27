"use client";
import { Button } from "./button";
import { useState } from "react";
import { ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Puff } from "react-loader-spinner";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { app } from "../utils/firebase";
import { createParentCategory, getAllParentCategory } from "../lib/handleForm";
import { lusitana } from "./fonts";
import { useParentCategoryContext } from "../providers/ParentCategoryContext";

const storage = getStorage(app);

export default function ParentCategoryForm() {
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const { setParentCategories } = useParentCategoryContext();

  //cancel function
  const cancel = () => {
    setName("");
    setSelectedFile(null);
  };
  //image function
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]; // Get the first selected file
    if (!file) return;

    // Clear previously selected files and add the new one
    setSelectedFile(file);

    // Initiate upload
    await uploadFile(file);
  };

  // Function to upload file
  const uploadFile = async (file: File) => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `images/${file.name}`),
      file
    );

    // Handle upload progress, errors, and completion
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update downloadUrls state after successful upload
    setImage(downloadURL);
  };

  const getParentCatFunc = async () => {
    try {
      const cat = await getAllParentCategory();
      if (cat.status === 200) {
        setParentCategories(cat.data);
      }
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  //function for submitting form
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createParentCategory({ name, image, bgColor });
      // If submission is successful, navigate to the desired page
      if (res.status === 200) {
        setName("");
        setBgColor("");
        setSelectedFile(null);
        setImage("");
        getParentCatFunc();
      } else {
        console.log("can't create product");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Parent Category Name */}
      <div className="rounded-md mb-3 bg-gray-50 p-4 md:p-6">
        <h2 className={`${lusitana.className} text-xl mb-3`}>
          Create Category
        </h2>
        <div className="mb-4 flex gap-4">
          <div className="w-full">
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  name="name"
                  value={name}
                  type="string"
                  placeholder="Enter Category Name"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/**parent Category card background */}
          <div className="w-full">
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  name="bgColor"
                  value={bgColor}
                  type="string"
                  placeholder="Enter Background Color"
                  onChange={(e) => setBgColor(e.target.value)}
                  required
                  className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Image input */}
        <div className="flex mb-4 gap-1">
          <label
            htmlFor="image"
            className="px-4 py-7 rounded-lg bg-white border text-gray-800 gap-2 flex flex-col items-center justify-center"
          >
            <ArrowUpTrayIcon width={35} />
            <div className="text-sm">Choose Image</div>
            <input
              type="file"
              className="hidden"
              multiple
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          </label>
          {selectedFile && (
            <div>
              {image ? (
                <Image
                  src={image}
                  width={96}
                  height={96}
                  className="w-[96px] h-[96px] object-contain rounded-lg"
                  alt={`Preview ${selectedFile.name}`}
                />
              ) : (
                <div className="w-[121px] h-[121px] border rounded-lg flex items-center justify-center">
                  <Puff color="blue" width={35} />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => cancel()}
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </button>
          <Button type="submit">
            <span className="hidden md:block">Create </span>{" "}
            <PlusIcon className="h-5 md:ml-4" />
          </Button>
        </div>
      </div>
    </form>
  );
}
