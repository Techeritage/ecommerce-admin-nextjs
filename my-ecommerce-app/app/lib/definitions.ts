// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Breadcrumb = {
  label: string;
  href: string;
  active?: boolean;
};

export type ParentData = {
  name: string;
  _id: string;
  bgColor: string;
};

export type PostParentCategoryData = {
  name: string;
  image: string;
  bgColor?: string;
}

export type PostProductData = {
  name: string;
  selectedParent: string;
};

export type subcategoryData = {
  _id: string;
  name: string;
  parent: { name: string };
};

export type ProductData = {
  name: string;
  description: string;
  price: number;
  images: string[];
  subcategory: string;
  tag: string;
  _id: string;
};

export type CategoryData = {
  name: string;
  _id: string;
};

export type TagData = {
  name: string;
  _id: string;
};

export type PostTagData = {
  name: string;
};

export type EditInvoiceFormProps = {
  id: string;
};
