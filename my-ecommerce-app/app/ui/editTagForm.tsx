"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { UpdateTag, fetchOneTag } from "../lib/handleForm";
import { useRouter } from "next/navigation";

export default function EditTagForm({ id }: { id: string }) {
  const router = useRouter();

  const [name, setName] = useState("");

  useEffect(() => {
    getTagFunc();
  });

  const getTagFunc = async () => {
    try {
      const tag = await fetchOneTag(id);
      setName(tag.data?.name);
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  //onsubmit function
  const handleTagSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const res = await UpdateTag({name, id});
      if (res.status === 200) {
        setName("");
        router.push('/dashboard/categories/tags');
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleTagSubmit}>
      {/* Tag Name */}
      <div className="mb-4">
        <div className="w-full">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Edit Tag Name
          </label>
          <div className="mt-2 rounded-md flex gap-2 w-full">
            <div className="relative flex-grow">
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
            <Button type="submit">Save Tag</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
