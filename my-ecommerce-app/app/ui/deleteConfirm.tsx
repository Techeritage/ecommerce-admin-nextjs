import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const DeleteConfirm = ({ tagName }: { tagName: string }) => {
  return (
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
        <button className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-400">
          Delete "{tagName}"
        </button>
      </div>
      <div className="mb-2">
        <button className="w-full border-2 border-slate-200 p-2 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirm;
