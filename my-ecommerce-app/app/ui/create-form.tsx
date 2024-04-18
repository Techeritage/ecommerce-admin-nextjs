"use client";
import Link from "next/link";

import {
  ArrowUpTrayIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FolderIcon,
  NewspaperIcon,
  TagIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";
import { fetchAllTags, getAllCategory, handleSubmit } from "../lib/handleForm";
import { useRouter } from "next/navigation";
import { Puff } from "react-loader-spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";
import Image from "next/image";

const storage = getStorage(app);

interface ProductData {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  properties: PropertiesData[];
  tag: string;
}

interface CategoryData {
  name: string;
  _id: string;
  properties: string[];
}

interface TagData {
  name: string;
  _id: string;
}

interface PropertiesData {
  name: string;
  value: string;
}

export default function Form() {
  //state
  const [name, setName] = useState(""); // Type annotation for name as string
  const [description, setDescription] = useState(""); // Type annotation for description as string
  const [price, setPrice] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData[]>([]);
  const [category, setCategory] = useState("");
  const [properties, setProperties] = useState<PropertiesData[]>([]);
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [tag, setTag] = useState("");

  //router setup
  const router = useRouter();

  //onload activity
  useEffect(() => {
    handleParentCat();
    handleTag();
  }, []);

  //function for calling cateory and setting category
  async function handleParentCat() {
    const res = await getAllCategory();
    setSelectedCategory(res.data);
  }

  async function handleTag() {
    const res = await fetchAllTags();
    setAllTags(res.data);
  }

  // Function to handle property change
  const handlePropertyChange = (propName: string, value: string) => {
    setProperties((prevProps) => {
      const existingPropertyIndex = prevProps.findIndex(
        (prop) => prop.name === propName
      );
      if (existingPropertyIndex !== -1) {
        // Update existing property value
        return [
          ...prevProps.slice(0, existingPropertyIndex),
          { name: propName, value },
          ...prevProps.slice(existingPropertyIndex + 1),
        ];
      } else {
        // Add new property-value pair
        return [...prevProps, { name: propName, value }];
      }
    });
  };

  //image function
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles([...selectedFiles, ...newFiles]); // Update selectedFiles state

    // Initiate uploads (implementation based on your configuration)
    const uploadPromises = newFiles.map((file) => uploadFile(file)); // Replace with your upload function
    await Promise.all(uploadPromises);
  };

  const uploadFile = async (file: File) => {
    const uploadTask = uploadBytesResumable(
      ref(storage, `images/${file.name}`),
      file
    );

    // Handle upload progress, errors, and completion (as shown in your configuration)
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update downloadUrls state after successful upload
    setImages((prevUrls) => [...prevUrls, downloadURL]);
  };

  //onsubmit function
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: ProductData = {
      name,
      description,
      price,
      images,
      category,
      properties,
      tag,
    };
    try {
      const res = await handleSubmit(data);
      // If submission is successful, navigate to the desired page
      if (res.status === 200) {
        router.push("/dashboard/products");
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
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Product Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                value={name}
                type="string"
                placeholder="Enter Product Name"
                onChange={(e) => setName(e.target.value)}
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <WalletIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/********TAGS *************/}
        <div className="mb-4">
          <label htmlFor="tag" className="mb-2 block text-sm font-medium">
            Choose tag
          </label>
          <div className="relative">
            <select
              id="tag"
              name="parent"
              value={tag}
              onChange={(ev) => setTag(ev.target.value)}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="">untagged</option>
              {allTags.length > 0 &&
                allTags.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
            </select>
            <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/*Category */}
        <div className="mb-4">
          <label htmlFor="parent" className="mb-2 block text-sm font-medium">
            Choose category
          </label>
          <div className="relative">
            <select
              id="parent"
              name="parent"
              value={category}
              onChange={(ev) => setCategory(ev.target.value)}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="">uncategorized</option>
              {selectedCategory.length > 0 &&
                selectedCategory.map((p: CategoryData) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
            </select>
            <FolderIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>

        {/********PROPERTIES *************/}
        <div>
          {selectedCategory.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategory
                .find((cat) => cat._id === category)
                ?.properties.map((prop) => (
                  <label key={prop} className="text-sm font-normal  mb-4">
                    {prop}:
                    <input
                      type="text"
                      className="peer block w-[100px] rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500"
                      value={
                        properties.find((p) => p.name === prop)?.value || ""
                      }
                      onChange={(e) =>
                        handlePropertyChange(prop, e.target.value)
                      }
                    />
                  </label>
                ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                value={description}
                rows={2}
                placeholder="Enter Product description"
                onChange={(e) => setDescription(e.target.value)}
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <NewspaperIcon className="pointer-events-none absolute left-3 top-[30%] h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Image input */}
        <p className="mb-2 block text-sm font-medium">Images</p>
        <div className="flex mb-4 gap-1">
          <label
            htmlFor="image"
            className="w-24 h-24 rounded-lg bg-gray-200 text-gray-600 flex items-center justify-center"
          >
            <ArrowUpTrayIcon width={35} />
            <input
              type="file"
              className="hidden"
              multiple
              id="image"
              name="image"
              onChange={handleFileChange}
            />
          </label>
          {selectedFiles.map((file, index) => (
            <div key={index}>
              {images[index] ? (
                <Image
                  src={images[index]}
                  width={96}
                  height={96}
                  className="w-[96px] h-[96px] object-contain rounded-lg"
                  alt={`Preview ${file.name}`}
                />
              ) : (
                <div className="w-24 h-24 border rounded-lg flex items-center justify-center">
                  <Puff color="blue" width={35} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Product Amount */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Enter Product Price"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Product</Button>
      </div>
    </form>
  );
}
