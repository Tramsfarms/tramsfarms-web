"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

import constant from "../../../../../../utils/constant";

export default function PaymentInformation() {
  const [processing, setProcessing] = useState(false);

  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { API_URL } = constant;

  const router = useRouter();

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const token = Cookies.get("vendors_auth_token"); // Get the token from cookies

        if (!token) {
          throw new Error("User not authenticated");
        }

        const myHeaders = {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        };

        const response = await axios.get(`${API_URL}payment-info`, {
          headers: myHeaders,
        });

        if (response.status === 200 && response.data.data) {
          const { beneficiary_name, bank_name, account_number } =
            response.data.data;
          setBeneficiaryName(beneficiary_name);
          setBankName(bank_name);
          setAccountNumber(account_number);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          toast.info("No payment information found, please fill out the form.");
        } else {
          toast.error("An error occurred while fetching payment information.");
        }
      }
    };

    fetchPaymentInfo();
  }, [API_URL]);

  const submit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = Cookies.get("vendors_auth_token"); // Get the token from cookies

      const myHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      };

      const data = {
        beneficiary_name: beneficiaryName,
        bank_name: bankName,
        account_number: accountNumber,
      };

      const response = await axios.post(`${API_URL}payment-info`, data, {
        headers: myHeaders,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        //router.push("/some-page"); // Redirect after successful submission
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((field) => {
          error.response.data.errors[field].forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2">
      <div className="w-full p-5 bg-white rounded-lg">
        <h1 className="mt-5 text-xl font-medium text-gray-400">
          Payment Information
        </h1>

        <form onSubmit={submit}>
          <div className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2 md:grid-cols-4">
            <input
              type="text"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Account Name"
              required
            />
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Bank Name"
              required
            />
            <input
              type="number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-2 text-sm bg-white border rounded-lg outline-none no-spin border-grays-200 hover:border-brand-500 focus:ring-0 ring-0 focus:outline-none"
              placeholder="Account Number"
              required
            />
          </div>
          <button
            type="submit"
            className="p-[4px_12px] text-white font-medium mt-5 rounded-lg bg-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="animate-spin"
              >
                <path
                  fill="currentColor"
                  d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                />
                <path
                  fill="currentColor"
                  d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
                />
              </svg>
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
