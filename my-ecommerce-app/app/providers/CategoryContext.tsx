'use client';
import React, { ReactNode, createContext, useContext, useState } from 'react';

const CategoryContext = createContext<any>(null);

export const useCategoryContext = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }: {children: ReactNode}) => {
  const [categories, setCategories] = useState([]);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
