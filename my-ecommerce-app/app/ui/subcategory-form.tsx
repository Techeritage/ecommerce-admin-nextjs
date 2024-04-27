"use client";
import { Button } from "@/app/ui/button";
import { useEffect, useState } from "react";
import {
  createSubcategory,
  getAllParentCategory,
  getAllSubcategory,
} from "../lib/handleForm";
import { useCategoryContext } from "../providers/CategoryContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import { lusitana } from "./fonts";

interface ProductData {
  name: string;
  _id: string;
}

export default function SubCategoryForm() {
  //states
  const [name, setName] = useState("");
  const [selectedParent, setSelectedParent] = useState<string | undefined>(
    undefined
  );
  const { setCategories } = useCategoryContext();
  const [parentCat, setParentCat] = useState([]);

  //cancel function
  const cancel = () => {
    setName("");
    setSelectedParent("");
  };

  //useEffect
  useEffect(() => {
    handleParentCat();
  }, []);

  //function for updating parent category
  async function handleParentCat() {
    const res = await getAllParentCategory();
    if (res.status === 200) {
      setParentCat(res.data);
    }
  }

  //function for updating global category state
  const getCategoryFunc = async () => {
    try {
      const cat = await getAllSubcategory();
      setCategories(cat.data);
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  //Function for creating creating Category
  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createSubcategory({
        name,
        selectedParent,
      });
      if (res.status === 200) {
        getCategoryFunc();
        setName("");
        setSelectedParent("");
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {parentCat && (
        <form onSubmit={handleCreateCategory}>
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <h2 className={`${lusitana.className} text-xl mb-3`}>
              Create Subcategory
            </h2>
            {/* Category Name */}
            <div className="mb-4 flex gap-4 items-center">
              <div className="w-full">
                <div className="relative rounded-md">
                  <div className="relative">
                    <input
                      name="name"
                      value={name}
                      type="string"
                      placeholder="Enter Subcategory Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>
              {/**Parent category */}
              <div className="w-full">
                <div>
                  <select
                    id="parent"
                    name="parent"
                    value={selectedParent}
                    onChange={(ev) => setSelectedParent(ev.target.value)}
                    className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  >
                    <option value="">Choose Parent Category</option>
                    {parentCat.length > 0 &&
                      parentCat.map((p: ProductData) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
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
      )}
    </>
  );
}
