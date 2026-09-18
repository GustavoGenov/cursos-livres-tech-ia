"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS as INITIAL_PRODUCTS, Product } from "@/data/products";

interface ProductsContextType {
  products: Product[];
  addProduct: (newProduct: Omit<Product, "id"> & { id?: string }) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefault: () => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = "@cursos-livres-tech-ia/custom-products";

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carrega produtos customizados salvos localmente
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
        }
      }
    } catch (e) {
      console.error("Erro ao carregar produtos do armazenamento:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salva no localStorage sempre que houver alterações após o carregamento inicial
  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Erro ao salvar produtos:", e);
    }
  };

  const addProduct = (newProd: Omit<Product, "id"> & { id?: string }) => {
    const id = newProd.id || `prod-${Date.now()}`;
    const product: Product = {
      ...newProd,
      id,
    };
    const updated = [product, ...products];
    saveProducts(updated);
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, ...updatedFields } : p
    );
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const resetToDefault = () => {
    saveProducts(INITIAL_PRODUCTS);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefault,
        getProductBySlug,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de ProductsProvider");
  }
  return context;
}
