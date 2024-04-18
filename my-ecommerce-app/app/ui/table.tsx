"use client";
import { UpdateInvoice } from "@/app/ui/buttons";
import {
  deleteOneProduct,
  fetchProductByQuery,
  fetchProducts,
} from "../lib/handleForm";
import { useEffect, useState } from "react";
import { formatCurrency } from "../lib/utils";
import {
  ExclamationTriangleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface ProductData {
  _id: string;
  name: string;
  description: string;
  price: number;
}

export default function InvoicesTable({ query }: { query: string }) {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [temporaryTag, setTemporaryTag] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    fetchData();
  }, [query]);

  const fetchData = async () => {
    try {
      if (query) {
        const res = await fetchProductByQuery(query); // Use specific fetch function for search
        setProducts(res.data);
      } else {
        const data = await fetchProducts(); // Use specific fetch function for all products
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = (tag: string) => {
    setTemporaryTag(tag);
    setDeletePopup(true);
  };

  const handleProductDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await deleteOneProduct(temporaryTag);
      if (res.status === 200) {
        fetchData();
        setDeletePopup(false);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      {deletePopup && (
        <form onSubmit={handleProductDelete}>
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
                {products.find((p) => p._id === temporaryTag)?.name || ""}&quot;
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
            <div className="md:hidden">
              {products &&
                products.map((product) => (
                  <div
                    key={product?._id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <p>{product?.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div>
                        <p className="text-xl font-medium">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <UpdateInvoice id={product._id} />
                        <button onClick={() => deleteProduct(product._id)}>
                          <span className="sr-only">Delete</span>
                          <TrashIcon className="w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            {products.length > 0 ? (
              <table className="hidden min-w-full text-gray-900 md:table">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Product Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Price
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <p>{product.name}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateInvoice id={product._id} />
                          <button onClick={() => deleteProduct(product._id)}>
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
              <p>Loading products...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
