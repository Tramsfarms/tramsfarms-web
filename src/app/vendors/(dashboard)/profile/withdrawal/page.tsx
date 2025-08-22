"use client";

import { useState, useEffect } from "react";
import { paymentService } from "@/utils/paymentService";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDate } from "@/utils/formatDate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BankAccount {
  id: number;
  bank_name: string;
  account_number: string;
  beneficiary_name: string;
}

interface Withdrawal {
  id: number;
  amount: number;
  status: string;
  created_at: string;
  bank: {
    bank_name: string;
    account_number: string;
  };
  decline_reason?: string;
}

export default function WithdrawalPage() {
  const [balance, setBalance] = useState<number>(0);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    bankId: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [balanceRes, accountsRes, withdrawalsRes] = await Promise.all([
        paymentService.getBalance(),
        paymentService.getPaymentAccounts(),
        paymentService.getWithdrawals(),
      ]);

      setBalance(balanceRes.data.balance);
      setBankAccounts(accountsRes.data);
      setWithdrawals(withdrawalsRes.data);
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.bankId || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setWithdrawLoading(true);
      const response = await paymentService.requestWithdrawal({
        amount: Number(formData.amount),
        bank_account_id: Number(formData.bankId),
        password: formData.password,
      });

      if (response.status) {
        toast.success("Withdrawal processed successfully");
      } else {
        // If the withdrawal was rejected
        toast.error(response.message || "Withdrawal failed");
      }

      setFormData({ amount: "", bankId: "", password: "" });
      fetchData(); // Refresh data to show the new withdrawal status
    } catch (error) {
      toast.error("Failed to process withdrawal request");
      console.error(error);
    } finally {
      setWithdrawLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Balance Card */}
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Available Balance</h2>
        <p className="text-3xl font-bold text-primary">
          {formatCurrency(balance)}
        </p>
      </div>

      {/* Withdrawal Form */}
      <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Request Withdrawal</h2>
        <form onSubmit={handleWithdrawal}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                min="1000"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Bank Account
              </label>
              <select
                value={formData.bankId}
                onChange={(e) =>
                  setFormData({ ...formData, bankId: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select bank account</option>
                {bankAccounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.bank_name} - {account.account_number}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter your password"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              disabled={withdrawLoading}
              className="w-full px-4 py-2 text-white transition-colors rounded-lg bg-primary hover:bg-primary-dark disabled:opacity-50"
            >
              {withdrawLoading ? "Processing..." : "Request Withdrawal"}
            </button>
          </div>
        </form>
      </div>

      {/* Withdrawal History */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Withdrawal History</h2>
        {withdrawals.length === 0 ? (
          <p className="text-gray-500">No withdrawal history found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Bank Account
                  </th>
                  <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {withdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(withdrawal.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(withdrawal.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {withdrawal.bank.bank_name} -{" "}
                      {withdrawal.bank.account_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          withdrawal.status
                        )}`}
                      >
                        {withdrawal.status}
                      </span>
                      {withdrawal.decline_reason && (
                        <p className="mt-1 text-sm text-red-600">
                          {withdrawal.decline_reason}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
