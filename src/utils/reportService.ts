import axios from "axios";
import Cookies from "js-cookie";
import constants from "@/utils/constant";

const API_URL = constants.API_URL;

class ReportService {
  private getToken() {
    return Cookies.get("vendors_auth_token");
  }

  private getHeaders() {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async submitReport(data: FormData) {
    try {
      const response = await axios.post(`${API_URL}reports/submit`, data, {
        headers: {
          ...this.getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async searchProducts(query: string) {
    try {
      const response = await axios.get(
        `${API_URL}reports/search-products?query=${encodeURIComponent(query)}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }

  async getProductByUrl(url: string) {
    try {
      const response = await axios.post(
        `${API_URL}reports/product-by-url`,
        { url },
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  }
}

export const reportService = new ReportService();
