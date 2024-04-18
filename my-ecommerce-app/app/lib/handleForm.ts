import axios from "axios";

//property type
interface PropertiesData {
  name: string;
  value: string;
}

/**********************PRODUCTS************************* */
export const handleSubmit = async (data: {
  name: string;
  description: string;
  price: number | undefined;
  images: string[];
  category: string;
  properties: PropertiesData[];
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
  category,
  properties,
}: {
  name: string;
  description: string;
  price?: number | undefined;
  images: string[];
  id: string;
  category: string;
  properties: PropertiesData[];
}) => {
  try {
    const res = await axios.put(`/api/products/${id}`, {
      name,
      price,
      description,
      images,
      category,
      properties,
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
export const createCategory = async ({
  name,
  selectedParent,
  properties,
}: {
  name: string;
  selectedParent?: string;
  properties?: string[];
}) => {
  try {
    const data = selectedParent
      ? { name, selectedParent, properties }
      : { name }; // Only include selectedParent if it's not null
    const res = await axios.post("/api/categories", data);
    return res;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const getAllCategory = async () => {
  try {
    const res = await axios.get("/api/categories");
    return res.data;
  } catch (error) {
    console.error("Error getting category:", error);
    throw error;
  }
};

export const deleteOneCategory = async (id: string) => {
  try {
    const res = await axios.delete(`/api/categories?id=${id}`);
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

export const EditCategory = async ({
  name,
  selectedParent,
  properties,
  id,
}: {
  name: string;
  selectedParent?: string;
  properties?: string[];
  id: string;
}) => {
  try {
    const res = await axios.put(`/api/categories?id=${id}`, {
      name,
      selectedParent,
      properties,
    });

    return res;
  } catch (error) {
    console.error("Error updating product:", error);
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

