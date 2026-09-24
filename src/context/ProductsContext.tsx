"use client";
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PRODUCTS as INITIAL_PRODUCTS, Product } from "@/data/products";

interface ProductsContextType {
  products: Product[];
  isLoaded: boolean;
  addProduct: (newProduct: Omit<Product, "id"> & { id?: string }) => void;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetToDefault: () => void;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

const STORAGE_KEY = "@cursos-livres-tech-ia/custom-products";

// Função para ler do localStorage de forma segura
function getStoredProducts(): Product[] | null {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Erro ao ler produtos salvos:", e);
  }
  return null;
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  // Inicialização inteligente: tenta ler imediatamente no cliente para evitar delay e 404
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = getStoredProducts();
    return stored || INITIAL_PRODUCTS;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Efeito adicional para sincronizar com Supabase ou reconfirmar localStorage
  useEffect(() => {
    try {
      const stored = getStoredProducts();
      if (stored) {
        setProducts(stored);
      }
    } catch (e) {
      console.error("Erro ao sincronizar catálogo:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salva no localStorage e mantém atualizado
  const saveProducts = useCallback((updated: Product[]) => {
    setProducts(updated);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error("Erro ao salvar produtos no localStorage:", e);
      }
    }
  }, []);

  const addProduct = useCallback(
    (newProd: Omit<Product, "id"> & { id?: string }) => {
      const id = newProd.id || `prod-${Date.now()}`;
      const product: Product = {
        ...newProd,
        id,
      };
      setProducts((current) => {
        const updated = [product, ...current];
        saveProducts(updated);
        return updated;
      });
    },
    [saveProducts]
  );

  const updateProduct = useCallback(
    (id: string, updatedFields: Partial<Product>) => {
      setProducts((current) => {
        const updated = current.map((p) =>
          p.id === id ? { ...p, ...updatedFields } : p
        );
        saveProducts(updated);
        return updated;
      });
    },
    [saveProducts]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      setProducts((current) => {
        const updated = current.filter((p) => p.id !== id);
        saveProducts(updated);
        return updated;
      });
    },
    [saveProducts]
  );

  const resetToDefault = useCallback(() => {
    saveProducts(INITIAL_PRODUCTS);
  }, [saveProducts]);

  const getProductBySlug = useCallback(
    (slug: string): Product | undefined => {
      if (!slug) return undefined;
      const cleanSlug = decodeURIComponent(slug).toLowerCase().trim();

      // 1. Procura na lista em memória atual
      let found = products.find(
        (p) =>
          p.slug.toLowerCase() === cleanSlug ||
          p.id.toLowerCase() === cleanSlug ||
          p.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-") === cleanSlug
      );

      if (found) return found;

      // 2. Fallback direto ao localStorage para garantir que produtos recém-criados nunca dêem 404
      if (typeof window !== "undefined") {
        const stored = getStoredProducts();
        if (stored) {
          found = stored.find(
            (p) =>
              p.slug.toLowerCase() === cleanSlug ||
              p.id.toLowerCase() === cleanSlug ||
              p.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-") === cleanSlug
          );
          if (found) {
            // Atualiza o estado em memória se encontrou no storage
            setProducts(stored);
            return found;
          }
        }
      }

      // 3. Fallback nos produtos iniciais
      return INITIAL_PRODUCTS.find(
        (p) =>
          p.slug.toLowerCase() === cleanSlug ||
          p.id.toLowerCase() === cleanSlug
      );
    },
    [products]
  );

  return (
    <ProductsContext.Provider
      value={{
        products,
        isLoaded,
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
