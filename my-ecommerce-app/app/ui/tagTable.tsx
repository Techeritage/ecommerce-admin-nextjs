"use client";
import React, { useEffect, useState } from "react";
import { deleteOneTag, fetchAllTags } from "../lib/handleForm";
import { useTagContext } from "../providers/TagContext";
import { UpdateTag } from "./buttons";

import {
  ExclamationTriangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { TagData } from "../lib/definitions";

export default function TagTable() {
  const { tags, setTags } = useTagContext();
  const [loading, setLoading] = useState(true);
  const [temporaryTag, setTemporaryTag] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    getTagFunc();
  }, []);

  const getTagFunc = async () => {
    try {
      const tag = await fetchAllTags();
      if (tag.status === 200) {
        setTags(tag.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error getting products:", error);
    }
  };

  const deleteTag = (tag: string) => {
    setTemporaryTag(tag);
    setDeletePopup(true);
  };

  const handleTagDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await deleteOneTag(temporaryTag);
      if (res.data.status === 200) {
        getTagFunc();
        setDeletePopup(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {deletePopup && (
        <form onSubmit={handleTagDelete}>
          <div className="bg-white absolute w-[400px] left-[50%] translate-x-[-50%] box-shadow py-8 px-5 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <div className="bg-red-100 w-max p-2 rounded-full">
                <ExclamationTriangleIcon width={30} color="red" />
              </div>
            </div>
            <p className="font-semibold text-center mb-1">Are you sure?</p>
            <p className="text-sm text-center text-gray-700 mb-2">
              This action cannot be undone.
            </p>
            <div className="max-w-full mb-2">
              <button
                type="submit"
                className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-400"
              >
                Delete &quot;
                {tags.find((tag: { _id: string }) => tag._id === temporaryTag)
                  ?.name || ""}
                &quot;
              </button>
            </div>
            <div className="mb-2">
              <button
                type="button"
                onClick={() => {
                  setDeletePopup(false);
                }}
                className="w-full border-2 border-slate-200 p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden"></div>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                Loading...
              </div>
            ) : tags?.length > 0 ? (
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Category Name
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {tags.map((tag: TagData) => (
                    <tr
                      key={tag._id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <p>{tag.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateTag id={tag._id} />
                          <button onClick={() => deleteTag(tag._id)}>
                            <span className="sr-only">Delete</span>
                            <TrashIcon className="w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex justify-center items-center h-40">
                No Tag found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
