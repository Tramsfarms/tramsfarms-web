import constants from "./constant";
import Cookies from "js-cookie";
import { API_URL } from "./constant";

const { API_URL: oldAPI_URL } = constants;

export const paymentService = {
  // Get all payment accounts for the current user
  getPaymentAccounts: async () => {
    try {
      const response = await fetch(`${oldAPI_URL}payment-info`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching payment accounts:", error);
      throw error;
    }
  },

  // Get list of banks from Paystack
  getBanks: async () => {
    try {
      const response = await fetch(`${oldAPI_URL}banks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching banks:", error);
      throw error;
    }
  },

  // Verify account number with Paystack
  verifyAccount: async (accountData) => {
    try {
      const response = await fetch(`${oldAPI_URL}verify-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
        },
        body: JSON.stringify({
          account_number: accountData.account_number,
          bank_code: accountData.bank_code,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error verifying account:", error);
      throw error;
    }
  },

  // Add or update a payment account
  addOrUpdatePaymentAccount: async (accountData) => {
    try {
      const response = await fetch(`${oldAPI_URL}payment-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
        },
        body: JSON.stringify(accountData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding/updating payment account:", error);
      throw error;
    }
  },

  // Get withdrawal history
  getWithdrawalHistory: async () => {
    try {
      const response = await fetch(`${oldAPI_URL}withdrawals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching withdrawal history:", error);
      throw error;
    }
  },

  // Get user balance
  getUserBalance: async () => {
    try {
      const response = await fetch(`${oldAPI_URL}user/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching user balance:", error);
      throw error;
    }
  },

  async getBalance() {
    try {
      const response = await fetch(`${oldAPI_URL}user/balance`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch balance");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  },

  async requestWithdrawal(body) {
    try {
      const response = await fetch(`${oldAPI_URL}withdrawals/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        // Even if withdrawal was rejected, the backend still returns the withdrawal record
        // So we handle both successful and rejected withdrawals here
        return data;
      }

      return data;
    } catch (error) {
      console.error("Error requesting withdrawal:", error);
      throw error;
    }
  },

  async getWithdrawals() {
    try {
      const response = await fetch(`${oldAPI_URL}withdrawals`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("vendors_auth_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch withdrawals");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      throw error;
    }
  },
};
//
