"use client";
import {
  ArrowUpTrayIcon,
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  FolderIcon,
  NewspaperIcon,
  TagIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";
import {
  UpdateProduct,
  fetchAllTags,
  fetchOneProduct,
  getAllSubcategory,
} from "../lib/handleForm";
import { Puff } from "react-loader-spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../utils/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

const storage = getStorage(app);

//id props type
interface EditInvoiceFormProps {
  id: string;
}

interface DisplayCategoryType {
  _id: string;
  parent: {
    _id: string;
  };
  // Other properties...
  properties: {}; // Adjust the type according to your structure
}

interface ProductData {
  _id: string;
  name: string;
}

interface CategoryData {
  name: string;
  _id: string;
}

interface PropertiesData {
  name: string;
  value: string;
}

interface TagData {
  name: string;
  _id: string;
}

export default function EditInvoiceForm({ id }: EditInvoiceFormProps) {
  const [name, setName] = useState(""); // Type annotation for name as string
  const [description, setDescription] = useState(""); // Type annotation for description as string
  const [price, setPrice] = useState<number>(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData[]>([]);
  const [subcategory, setSubcategory] = useState("");
  const [allTags, setAllTags] = useState<TagData[]>([]);
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  async function handleParentCat() {
    const res = await getAllSubcategory();
    setSelectedCategory(res.data);
  }

  async function handleTag() {
    const res = await fetchAllTags();
    setAllTags(res.data);
  }

  const fetchData = async () => {
    try {
      const res = await fetchOneProduct(id);
      if (res.data) {
        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setImages(res.data.images);
        setSubcategory(res.data?.subcategory);
        setTag(res.data?.tag);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchData();
    handleParentCat();
    handleTag();
  }, [id]);

  //function for image
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageLoading(true);
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setSelectedFiles([...selectedFiles, ...newFiles]); // Update selectedFiles state

    // Initiate uploads (implementation based on your configuration)
    const uploadPromises = newFiles.map((file) => uploadFile(file)); // Replace with your upload function
    await Promise.all(uploadPromises);
    setImageLoading(false);
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

    const res = await UpdateProduct({
      name,
      description,
      price,
      images,
      subcategory,
      tag,
      id,
    });
    if (res.status === 200) {
      router.push("/dashboard/products");
    }
  };
  return (
    <form onSubmit={handleFormSubmit}>
      {!loading && (
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
              name="tag"
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
            Choose Subcategory
          </label>
          <div className="relative">
            <select
              id="parent"
              name="subcategory"
              value={subcategory}
              onChange={(ev) => setSubcategory(ev.target.value)}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            >
              <option value="">uncategorized</option>
              {selectedCategory && selectedCategory.length > 0 &&
                selectedCategory.map((p: CategoryData) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
            </select>
            <FolderIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
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
            </label>
            <input
              type="file"
              className="hidden"
              multiple
              id="image"
              name="image"
              onChange={handleFileChange}
            />
            {images.map((image, index) => (
              <div key={index}>
                <Image
                  width={96}
                  height={96}
                  src={image}
                  alt={`Preview ${index}`}
                  className="w-[96px] h-[96px] object-contain rounded-lg"
                />
              </div>
            ))}
            {imageLoading && (
              <div className="w-24 h-24 border rounded-lg flex items-center justify-center">
                <Puff color="blue" width={35} />
              </div>
            )}
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
                  value={price}
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
      )}

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Product</Button>
      </div>
    </form>
  );
}
