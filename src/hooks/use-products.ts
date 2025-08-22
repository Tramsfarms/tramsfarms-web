"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import constants from "@/utils/constant";

export function useProducts() {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constants;

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}products`);
        setProducts(response.data);
      } catch (error) {
        toast.error("Failed to fetch products");
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, [API_URL]); // Added API_URL to the dependency array

  return { products, isLoading };
}
