"use client";
import React, { useState } from "react";
import { Button } from "./button";
import { createTag, fetchAllTags } from "../lib/handleForm";
import { useTagContext } from "../providers/TagContext";

export default function TagForm() {
  const [name, setName] = useState("");
  const { tags, setTags } = useTagContext();

  const getCategoryFunc = async () => {
    try {
      const tag = await fetchAllTags();
      setTags(tag.data);
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  //onsubmit function
  const handleTagSubmit = async(ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const res = await createTag(name);
      if (res.status === 200) {
        setName('');
        getCategoryFunc();
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
            Tag Name
          </label>
          <div className="mt-2 rounded-md flex gap-2 w-full">
            <div className="relative flex-grow">
              <input
                id="name"
                name="name"
                value={name}
                type="string"
                placeholder="Enter Tag Name"
                onChange={(e) => setName(e.target.value)}
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <Button type="submit">Create Tag</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
