"use client";
import React, { useEffect, useState } from "react";
import { lusitana } from "./fonts";
import { Button } from "./button";
import {
  EditSubcategory,
  fetchOneCategory,
  getAllParentCategory,
} from "../lib/handleForm";
import { useRouter } from "next/navigation";
import { ParentData } from "../lib/definitions";


export default function EditSubcategoryForm({ id }: { id: string }) {
  //states
  const [name, setName] = useState("");
  const [selectedParent, setSelectedParent] = useState<string | undefined>(
    undefined
  );
  const [parentCat, setParentCat] = useState([]);
  const [ready, setReady] = useState(false);

  const router = useRouter();

  //cancel function
  const cancel = () => {
    setName("");
    setSelectedParent("");
  };

  //function for updating parent category
  async function handleParentCat() {
    const res = await getAllParentCategory();
    if (res.status === 200) {
      setParentCat(res.data);
    }
  }

  async function findCategory() {
    const res = await fetchOneCategory(id);
    if (res.status === 200) {
      setName(res.data?.name);
      setSelectedParent(res.data?.parent);
      setReady(true);
    }
  }

  //useEffect
  useEffect(() => {
    findCategory();
    handleParentCat();
  }, []);

  const handleEditSubcategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await EditSubcategory({
        name,
        selectedParent,
        id,
      });
      if (res.status === 200) {
        setName("");
        setSelectedParent("");
        router.push('/dashboard/categories/subcategories');
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
        <form onSubmit={handleEditSubcategory}>
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <h2 className={`${lusitana.className} text-xl mb-3`}>
              Edit Subcategory
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
                      placeholder="Edit Subcategory Name"
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
                      parentCat.map((p: ParentData) => (
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
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
