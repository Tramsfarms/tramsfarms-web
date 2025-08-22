"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { productService } from "@/utils/productService";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/product";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Component that uses useSearchParams
function RecommendedProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setCurrentPage(page);
    fetchProducts(page);
  }, [searchParams]);

  const fetchProducts = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await productService.getRecommendedProducts(page);
      setProducts(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      toast.error("Failed to fetch recommended products");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    router.push(`/products/all/recommended?page=${page}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductGrid
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        title="Recommended Products"
        isLoading={isLoading}
      />
    </div>
  );
}

export default function RecommendedProductsPage() {
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-8">
            Loading Recommended products...
          </div>
        }
      >
        <RecommendedProductsContent />
      </Suspense>
      <Footer />
    </div>
  );
}
