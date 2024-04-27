"use client";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";
import { EditCategory, fetchOneParentCategory } from "../lib/handleForm";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";
import Image from "next/image";
import { Puff } from "react-loader-spinner";
import { app } from "../utils/firebase";
import { useRouter } from "next/navigation";

const storage = getStorage(app);

export default function EditCategoryForm({ id }: { id: string }) {
  //states
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [image, setImage] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const router = useRouter();

  //cancel function
  const cancel = () => {
    setName("");
  };

  //function for finding category with id
  async function findCategory() {
    const res = await fetchOneParentCategory(id);
    if (res.status === 200) {
      setName(res.data?.name);
      setBgColor(res.data?.bgColor);
      setImage(res?.data?.image);
      setReady(true);
    }
  }

  //useEffect
  useEffect(() => {
    findCategory();
  }, []);

  //image function
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadFile(file);
  };

  // Function to upload file
  const uploadFile = async (file: File) => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `images/${file.name}`),
      file
    );

    // Handle upload progress, errors, and completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle progress
        setImage(""); // Clear previous image
        setImageLoading(true);
      },
      (error) => {
        // Handle errors
        console.error("Error uploading image:", error);
      },
      async () => {
        // Upload completed successfully, get download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        // Update downloadUrls state after successful upload
        setImage(downloadURL);
        setImageLoading(false);
      }
    );
  };

  //Function for creating creating Category
  const handleUpdateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await EditCategory({
        name,
        bgColor,
        image,
        id,
      });
      if (res.status === 200) {
        setName("");
        setBgColor("");
        setImage("");
        router.push("/dashboard/categories");
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {ready && (
        <form onSubmit={handleUpdateCategory}>
          {/* Parent Category Name */}
          <div className="rounded-md mb-3 bg-gray-50 p-4 md:p-6">
            <h2 className={`${lusitana.className} text-2xl mb-3`}>
              Edit Category
            </h2>
            <div className="mb-4 flex gap-4">
              <div className="w-full">
                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      name="name"
                      value={name}
                      type="string"
                      placeholder="Edit Category Name"
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
                      placeholder="Edit Background Color"
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

              <div>
                {image && (
                  <Image
                    src={image}
                    width={96}
                    height={96}
                    className="w-[96px] h-[96px] object-contain rounded-lg"
                    alt={"Preview image"}
                  />
                )}

                {imageLoading && (
                  <div className="w-[121px] h-[121px] border rounded-lg flex items-center justify-center">
                    <Puff color="blue" width={35} />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => cancel()}
                className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
              >
                Cancel
              </button>
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
