"use client";
import { Button } from "@/app/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createCategory, getAllCategory } from "../lib/handleForm";
import { useCategoryContext } from "../providers/CategoryContext";
import { TrashIcon } from "@heroicons/react/24/outline";

//Prouct type
interface ProductData {
  _id: string;
  name: string;
}

export default function CategoryForm() {
  //states
  const [name, setName] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [selectedParent, setSelectedParent] = useState<string | undefined>(
    undefined
  );
  const { categories, setCategories } = useCategoryContext();
  const [parentCat, setParentCat] = useState([]);
  const [properties, setProperties] = useState<string[]>([]);

  //useEffect
  useEffect(() => {
    handleParentCat();
  }, [categories]);

  //function for updating parent category
  async function handleParentCat() {
    const res = await getAllCategory();
    setParentCat(res.data);
  }

  //function for updating global category state
  const getCategoryFunc = async () => {
    try {
      const cat = await getAllCategory();
      setCategories(cat.data);
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  //function for adding property
  const handleAddProperty = () => {
    if (propertyName.trim() === "") return;
    setProperties([...properties, propertyName.trim()]);
    setPropertyName("");
  };

  //function for deleting property
  const handleRemoveProperty = (index: number) => {
    const updatedProperties = [...properties];
    updatedProperties.splice(index, 1);
    setProperties(updatedProperties);
  };

  //Function for creating creating Category
  const handleCreateCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await createCategory({
        name,
        selectedParent,
        properties,
      });
      if (res.status === 200) {
        setName("");
        setSelectedParent("");
        setProperties([]);
        getCategoryFunc();
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleCreateCategory}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category Name */}
        <div className="mb-4 flex gap-4">
          <div className="w-full">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Category Name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="name"
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
          {/**Parent category */}
          <div className="w-full">
            <label htmlFor="parent" className="mb-2 block text-sm font-medium">
              Choose parent category
            </label>
            <div>
              <select
                id="parent"
                name="parent"
                value={selectedParent}
                onChange={(ev) => setSelectedParent(ev.target.value)}
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="">Uncategorized</option>
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
        {/* Properties*/}
        <div className="mb-4">
          <label htmlFor="pname" className="mb-2 block text-sm font-medium">
            Property Name
          </label>
          <div className="relative mt-2 flex gap-4">
            <input
              type="text"
              id="pname"
              placeholder="E.g, RAM"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              className="peer block max-w-sm rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <Button type="button" onClick={handleAddProperty}>
              Add new property
            </Button>
          </div>
          <div className="mt-4">
            <h3 className="mb-2 block text-sm font-medium">Properties:</h3>
            <div className="flex gap-3 flex-wrap">
              {properties.length > 0 ? (
                <>
                  {properties.map((prop, index) => (
                    <div
                      key={index}
                      className="bg-white w-[20%] flex items-center justify-between gap-4 text-sm mt-2 py-1 px-2 rounded-md"
                    >
                      {prop}
                      <button
                        className="rounded-md border p-1 hover:bg-gray-100"
                        type="button"
                        onClick={() => handleRemoveProperty(index)}
                      >
                        <TrashIcon className="w-4" />
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                <p className="text-sm">
                  Add new property
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/dashboard/categories"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancel
          </Link>
          <Button type="submit">Create Category</Button>
        </div>
      </div>
    </form>
  );
}
