"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import constants from "@/utils/constant";

export function useOrders() {
  const [orders, setOrders] = useState(null);
  const [vendorOrders, setVendorOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constants;

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get("vendors_auth_token");
        const response = await axios.get(`${API_URL}buyer/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setOrders(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const getVendorOrders = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get("vendors_auth_token");
        const response = await axios.get(`${API_URL}vendor/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        setVendorOrders(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getVendorOrders();

    getOrders();
  }, [API_URL]);

  return { orders, isLoading, vendorOrders };
}
