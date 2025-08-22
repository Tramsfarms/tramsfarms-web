import axios from "axios";
import Cookies from "js-cookie";
import constants from "@/utils/constant";

const API_URL = constants.API_URL;

class AdService {
  private getHeaders() {
    return {
      Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
    };
  }

  async getAds() {
    try {
      const response = await axios.get(`${API_URL}vendor/ads`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch ads");
    }
  }

  async createAd(data: {
    product_id: number;
    budget: number;
    duration_days: number;
    target_audience: string;
  }) {
    try {
      const response = await axios.post(`${API_URL}vendor/ads`, data, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to create ad");
    }
  }

  async updateAdStatus(id: number, status: string) {
    try {
      const response = await axios.put(
        `${API_URL}vendor/ads/${id}/status`,
        { status },
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to update ad status"
      );
    }
  }

  async getStats() {
    try {
      const response = await axios.get(`${API_URL}vendor/ads/stats`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to fetch stats");
    }
  }
}

export const adService = new AdService();
