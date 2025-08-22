"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import constants from "@/utils/constant";

export function useBuyerPayments() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constants;

  useEffect(() => {
    const getPayment = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get("vendors_auth_token");
        const response = await axios.get(`${API_URL}buyer/payments`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setPayments(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPayment();
  }, [API_URL]);

  return { payments, isLoading };
}
