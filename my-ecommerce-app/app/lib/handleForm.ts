import axios from "axios";

/**********************PRODUCTS************************* */
export const handleSubmit = async (data: {
  name: string;
  description: string;
  price: number | undefined;
  images: string[];
  subcategory: string;
  tag: string;
}) => {
  try {
    const response = await axios.post("/api/products", data);
    return response.data;
  } catch (error) {
    console.error("Error submitting product:", error); // Handle network errors
    // Show error message to the user
  }
};

export const fetchProducts = async () => {
  try {
    const response = await axios.get("/api/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

export const fetchProductByQuery = async (query: string) => {
  try {
    const response = await axios.get(`/api/products?query=${query}`); // Assuming API route for search
    return response.data;
  } catch (error) {
    console.error(`Error fetching products by query: ${query}`, error);
    throw error; // Re-throw for handling in InvoicesTable
  }
};

export const fetchOneProduct = async (id: string) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

export const UpdateProduct = async ({
  name,
  description,
  price,
  images,
  id,
  subcategory,
  tag,
}: {
  name: string;
  description: string;
  price?: number | undefined;
  images: string[];
  id: string;
  subcategory: string;
  tag: string;
}) => {
  try {
    const res = await axios.put(`/api/products/${id}`, {
      name,
      price,
      description,
      images,
      subcategory,
      tag,
    });

    return res;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteOneProduct = async (id: string) => {
  try {
    const res = await axios.delete(`/api/products/${id}`);
    return res;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/**********************CATEGORY************************* */
export const createParentCategory = async ({
  name,
  image,
  bgColor,
}: {
  name: string;
  image: string;
  bgColor: string;
}) => {
  try {
    const data = { name, image, bgColor };

    const res = await axios.post("/api/categories/parent", data);
    return res;
  } catch (error) {
    console.error("Error creating parent category:", error);
    throw error;
  }
};

export const createSubcategory = async ({
  name,
  selectedParent,
}: {
  name: string;
  selectedParent?: string;
}) => {
  try {
    const data = { name, selectedParent };
    const res = await axios.post("/api/categories", data);
    return res;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const getAllSubcategory = async () => {
  try {
    const res = await axios.get("/api/categories");
    return res.data;
  } catch (error) {
    console.error("Error getting category:", error);
    throw error;
  }
};

export const getAllParentCategory = async () => {
  try {
    const res = await axios.get("/api/categories/parent");
    return res.data;
  } catch (error) {
    console.error("Error getting category:", error);
    throw error;
  }
};

export const deleteOneSubcategory = async (id: string) => {
  try {
    const res = await axios.delete(`/api/categories?id=${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting subategory:", error);
    throw error;
  }
};

export const deleteOneParentCategory = async (id: string) => {
  try {
    const res = await axios.delete(`/api/categories/parent?id=${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const fetchOneCategory = async (id: string) => {
  try {
    const res = await axios.get(`/api/categories?id=${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
};

export const fetchOneParentCategory = async (id: string) => {
  try {
    const res = await axios.get(`/api/categories/parent?id=${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
};

export const EditCategory = async ({
  name,
  bgColor,
  image,
  id,
}: {
  name: string;
  bgColor?: string;
  image?: string;
  id: string;
}) => {
  try {
    const res = await axios.put(`/api/categories/parent?id=${id}`, {
      name,
      bgColor,
      image,
      id,
    });

    return res;
  } catch (error) {
    console.error("Error updating parent category:", error);
    throw error;
  }
};

export const EditSubcategory = async ({
  name,
  selectedParent,
  id,
}: {
  name: string;
  selectedParent?: string;
  id: string;
}) => {
  try {
    const res = await axios.put(`/api/categories?id=${id}`, {
      name,
      selectedParent,
      id,
    });

    return res;
  } catch (error) {
    console.error("Error updating subcategory:", error);
    throw error;
  }
};

/**********************TAGS************************* */
export const createTag = async (name: string) => {
  try {
    const res = await axios.post("/api/categories/tags", { name });
    return res;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
};

export const fetchAllTags = async () => {
  try {
    const response = await axios.get("/api/categories/tags");
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

export const fetchOneTag = async (id: string) => {
  try {
    const res = await axios.get(`/api/categories/tags?id=${id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching category:", error);
  }
};

export const UpdateTag = async ({ name, id }: { name: string; id: string }) => {
  try {
    const res = await axios.put(`/api/categories/tags?id=${id}`, {
      name,
    });

    return res;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteOneTag = async (id: string) => {
  try {
    const res = await axios.delete(`/api/categories/tags?id=${id}`);
    return res;
  } catch (error) {
    console.error("Error deleting tag:", error);
    throw error;
  }
};
