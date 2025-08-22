import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/";

class PaymentService {
  private getToken() {
    return localStorage.getItem("token");
  }

  // User withdrawal endpoints
  async getWithdrawalHistory() {
    try {
      const response = await axios.get(`${API_URL}withdrawals`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching withdrawal history:", error);
      throw error;
    }
  }

  async requestWithdrawal(data: {
    amount: number;
    bank_account_id: string;
    password: string;
  }) {
    try {
      const response = await axios.post(`${API_URL}withdrawals`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error requesting withdrawal:", error);
      throw error;
    }
  }

  async getUserBalance() {
    try {
      const response = await axios.get(`${API_URL}user/balance`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user balance:", error);
      throw error;
    }
  }

  // Admin withdrawal endpoints
  async acceptWithdrawal(withdrawalId: string, data: { password: string }) {
    try {
      const response = await axios.post(
        `${API_URL}admin/withdrawals/${withdrawalId}/accept`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error accepting withdrawal:", error);
      throw error;
    }
  }

  async declineWithdrawal(
    withdrawalId: string,
    data: { password: string; reason: string }
  ) {
    try {
      const response = await axios.post(
        `${API_URL}admin/withdrawals/${withdrawalId}/decline`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error declining withdrawal:", error);
      throw error;
    }
  }
}

export const paymentService = new PaymentService();
