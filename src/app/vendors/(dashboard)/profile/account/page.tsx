"use client";

import { useState, useEffect } from "react";
import { paymentService } from "@/utils/paymentService";
import { toast } from "react-toastify";

interface BankAccount {
  id: number;
  bank_name: string;
  account_number: string;
  beneficiary_name: string;
}

export default function AccountPage() {
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bank_name: "",
    account_number: "",
    beneficiary_name: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const fetchBankAccounts = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getPaymentAccounts();
      setBankAccounts(response.data);
    } catch (error) {
      toast.error("Failed to load bank accounts");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingId) {
        await paymentService.addOrUpdatePaymentAccount({
          ...formData,
          id: editingId,
        });
        toast.success("Bank account updated successfully");
      } else {
        await paymentService.addOrUpdatePaymentAccount(formData);
        toast.success("Bank account added successfully");
      }
      setFormData({ bank_name: "", account_number: "", beneficiary_name: "" });
      setIsEditing(false);
      setEditingId(null);
      fetchBankAccounts();
    } catch (error) {
      toast.error("Failed to save bank account");
      console.error(error);
    }
  };

  const handleEdit = (account: BankAccount) => {
    setFormData({
      bank_name: account.bank_name,
      account_number: account.account_number,
      beneficiary_name: account.beneficiary_name,
    });
    setIsEditing(true);
    setEditingId(account.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {isEditing ? "Edit Bank Account" : "Add New Bank Account"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bank_name}
                onChange={(e) =>
                  setFormData({ ...formData, bank_name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter bank name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={formData.account_number}
                onChange={(e) =>
                  setFormData({ ...formData, account_number: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter account number"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Beneficiary Name
              </label>
              <input
                type="text"
                value={formData.beneficiary_name}
                onChange={(e) =>
                  setFormData({ ...formData, beneficiary_name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Enter beneficiary name"
                required
              />
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
            >
              {isEditing ? "Update Account" : "Add Account"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditingId(null);
                  setFormData({
                    bank_name: "",
                    account_number: "",
                    beneficiary_name: "",
                  });
                }}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">My Bank Accounts</h2>
        {bankAccounts.length === 0 ? (
          <p className="text-gray-500">No bank accounts found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bank Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Account Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beneficiary Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {bankAccounts.map((account) => (
                  <tr key={account.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {account.bank_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {account.account_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {account.beneficiary_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(account)}
                        className="text-primary hover:text-primary-dark mr-4"
                      >
                        Edit
                      </button>
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
