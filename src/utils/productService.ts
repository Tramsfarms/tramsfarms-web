import axios from "axios";
import Cookies from "js-cookie";

import constants from "@/utils/constant";

const API_URL = constants.API_URL;

class ProductService {
  private getHeaders() {
    return {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
  }

  async getProducts(page: number = 1, perPage: number = 15) {
    try {
      const response = await axios.get(`${API_URL}products`, {
        headers: this.getHeaders(),
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }

  async getProduct(id: number) {
    try {
      const response = await axios.get(`${API_URL}products/${id}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch product"
      );
    }
  }

  async createProduct(data: FormData) {
    try {
      const response = await axios.post(`${API_URL}products`, data, {
        headers: {
          ...this.getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to create product"
      );
    }
  }

  async updateProduct(id: number, data: FormData) {
    try {
      const response = await axios.post(`${API_URL}products/${id}`, data, {
        headers: {
          ...this.getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update product"
      );
    }
  }

  async deleteProduct(id: number) {
    try {
      const response = await axios.delete(`${API_URL}products/${id}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to delete product"
      );
    }
  }

  async getPaginatedProducts(page: number = 1, perPage: number = 12) {
    try {
      const response = await axios.get(`${API_URL}products/all`, {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch products");
    }
  }

  async getBigSaveProducts(page: number = 1, perPage: number = 12) {
    try {
      const response = await axios.get(`${API_URL}products/all/big-save`, {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch big save products");
    }
  }

  async getRecommendedProducts(page: number = 1, perPage: number = 12) {
    try {
      const response = await axios.get(`${API_URL}products/all/recommended`, {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch recommended products");
    }
  }
}

export const productService = new ProductService();
