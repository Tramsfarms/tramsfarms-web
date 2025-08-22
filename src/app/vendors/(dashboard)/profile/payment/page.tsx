"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Pencil,
  Plus,
  Trash2,
  CreditCard,
  Building,
  CheckCircle2,
  Wallet,
  History,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { paymentService } from "@/utils/paymentService";

// Updated interfaces
interface Bank {
  id: number;
  name: string;
  code: string;
  country: string;
  currency: string;
  type: string;
  is_active: boolean;
}

interface BankAccount {
  id: string;
  bank_name: string;
  bank_code?: string;
  account_number: string;
  beneficiary_name: string;
  account_name?: string;
  verified?: boolean;
}

interface Withdrawal {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  bank: {
    bank_name: string;
    account_number: string;
  };
}

export default function PaymentInformationPage() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [editingAccount, setEditingAccount] = useState<BankAccount | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [formData, setFormData] = useState({
    bank_name: "",
    bank_code: "",
    account_number: "",
    beneficiary_name: "",
    account_name: "",
    verified: false,
  });
  const [verificationStatus, setVerificationStatus] = useState<{
    verified: boolean;
    message: string;
    account_name?: string;
  } | null>(null);

  // Fetch bank accounts, balance and banks list
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [accountsResponse, balanceResponse, banksResponse] =
          await Promise.all([
            paymentService.getPaymentAccounts(),
            paymentService.getUserBalance(),
            paymentService.getBanks(),
          ]);

        if (accountsResponse.status) {
          setAccounts(accountsResponse.data);
        }

        if (balanceResponse.status) {
          setBalance(balanceResponse.data.balance);
        }

        if (banksResponse.status) {
          setBanks(banksResponse.data);
        }
      } catch (error) {
        toast.error("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch withdrawal history
  const fetchWithdrawalHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await paymentService.getWithdrawalHistory();
      if (response.status) {
        setWithdrawals(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch withdrawal history");
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Handle verification of account number
  const handleVerifyAccount = async () => {
    if (!formData.account_number || !formData.bank_code) {
      toast.error("Please enter account number and select a bank");
      return;
    }

    setIsVerifying(true);
    setVerificationStatus(null);

    try {
      const response = await paymentService.verifyAccount({
        account_number: formData.account_number,
        bank_code: formData.bank_code,
      });

      if (response.status) {
        setVerificationStatus({
          verified: true,
          message: "Account verified successfully",
          account_name: response.data.account_name,
        });

        // Update form data with verified account name
        setFormData({
          ...formData,
          beneficiary_name: response.data.account_name,
          account_name: response.data.account_name,
          verified: true,
        });

        toast.success("Account verified successfully");
      } else {
        setVerificationStatus({
          verified: false,
          message: response.error || "Verification failed",
        });
        toast.error(response.error || "Failed to verify account");
      }
    } catch (error) {
      setVerificationStatus({
        verified: false,
        message: "An error occurred during verification",
      });
      toast.error("Failed to verify account");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.bank_name ||
      !formData.bank_code ||
      !formData.account_number ||
      !formData.beneficiary_name
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.verified) {
      toast.error("Please verify your account number first");
      return;
    }

    setIsLoading(true);

    try {
      const response = await paymentService.addOrUpdatePaymentAccount(formData);

      if (response.status) {
        toast.success(response.message);

        // Refresh the accounts list
        const updatedResponse = await paymentService.getPaymentAccounts();
        if (updatedResponse.status) {
          setAccounts(updatedResponse.data);
        }

        handleClose();
      } else {
        toast.error(response.message || "Failed to save bank account");
      }
    } catch (error) {
      toast.error("Failed to save bank account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsAddingAccount(false);
    setEditingAccount(null);
    setVerificationStatus(null);
    setFormData({
      bank_name: "",
      bank_code: "",
      account_number: "",
      beneficiary_name: "",
      account_name: "",
      verified: false,
    });
  };

  const handleEdit = (account: BankAccount) => {
    setEditingAccount(account);
    setFormData({
      bank_name: account.bank_name,
      bank_code: account.bank_code || "",
      account_number: account.account_number,
      beneficiary_name: account.beneficiary_name,
      account_name: account.account_name || account.beneficiary_name,
      verified: account.verified || false,
    });
    setIsAddingAccount(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await paymentService.deletePaymentAccount(id);

      if (response.status) {
        toast.success(response.message);
        setAccounts(accounts.filter((account) => account.id !== id));
      } else {
        toast.error(response.message || "Failed to delete bank account");
      }
    } catch (error) {
      toast.error("Failed to delete bank account");
    }
  };

  // Handle bank selection
  const handleBankChange = (value: string) => {
    const selectedBank = banks.find((bank) => bank.code === value);
    if (selectedBank) {
      setFormData({
        ...formData,
        bank_name: selectedBank.name,
        bank_code: selectedBank.code,
        verified: false, // Reset verification when bank changes
      });
      setVerificationStatus(null);
    }
  };

  // Handle account number change
  const handleAccountNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      account_number: e.target.value,
      verified: false, // Reset verification when account number changes
    });
    setVerificationStatus(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="container p-6 mx-auto">
      {/* Balance Card */}
      <Card className="mb-6">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Available Balance
              </h3>
              <p className="text-2xl font-bold">{formatCurrency(balance)}</p>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button onClick={fetchWithdrawalHistory}>
                <History className="w-4 h-4 mr-2" />
                Withdrawal History
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Withdrawal History</DialogTitle>
                <DialogDescription>
                  Your recent withdrawal requests
                </DialogDescription>
              </DialogHeader>
              {isLoadingHistory ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : withdrawals.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No withdrawal history found
                </div>
              ) : (
                <div className="overflow-auto max-h-96">
                  {withdrawals.map((withdrawal) => (
                    <div
                      key={withdrawal.id}
                      className="py-3 border-b last:border-0"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">
                            {formatCurrency(withdrawal.amount)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(withdrawal.created_at)}
                          </p>
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              withdrawal.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : withdrawal.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {withdrawal.status.charAt(0).toUpperCase() +
                              withdrawal.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {withdrawal.bank.bank_name} -{" "}
                        {withdrawal.bank.account_number}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
          <TabsTrigger value="withdraw">Request Withdrawal</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payment Accounts</CardTitle>
                <CardDescription>
                  Manage your bank accounts for receiving payments
                </CardDescription>
              </div>
              <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {editingAccount
                        ? "Edit Bank Account"
                        : "Add Bank Account"}
                    </DialogTitle>
                    <DialogDescription>
                      {editingAccount
                        ? "Update your bank account details"
                        : "Add a new bank account for receiving payments"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="bank">Bank</Label>
                      <Select
                        value={formData.bank_code}
                        onValueChange={handleBankChange}
                        disabled={isLoading || banks.length === 0}
                      >
                        <SelectTrigger id="bank">
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {banks.map((bank) => (
                            <SelectItem key={bank.code} value={bank.code}>
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="account_number">Account Number</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="account_number"
                          placeholder="Enter account number"
                          value={formData.account_number}
                          onChange={handleAccountNumberChange}
                          disabled={isLoading}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          onClick={handleVerifyAccount}
                          disabled={
                            isVerifying ||
                            !formData.account_number ||
                            !formData.bank_code
                          }
                          variant="outline"
                        >
                          {isVerifying ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                          )}
                          Verify
                        </Button>
                      </div>
                      {verificationStatus && (
                        <div
                          className={`text-sm mt-1 ${
                            verificationStatus.verified
                              ? "text-green-600"
                              : "text-red-600"
                          } flex items-center`}
                        >
                          {verificationStatus.verified ? (
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                          ) : (
                            <AlertCircle className="w-4 h-4 mr-1" />
                          )}
                          {verificationStatus.message}
                        </div>
                      )}
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="account_name">Account Name</Label>
                      <Input
                        id="account_name"
                        placeholder="Account name (auto-filled after verification)"
                        value={
                          formData.account_name || formData.beneficiary_name
                        }
                        readOnly
                        disabled
                        className={
                          verificationStatus?.verified ? "bg-green-50" : ""
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="beneficiary_name">Beneficiary Name</Label>
                      <Input
                        id="beneficiary_name"
                        placeholder="Enter beneficiary name"
                        value={formData.beneficiary_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            beneficiary_name: e.target.value,
                          })
                        }
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={isLoading || !formData.verified}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Account"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                </div>
              ) : accounts.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No bank accounts found. Add a bank account to receive
                  payments.
                </div>
              ) : (
                <div className="grid gap-4">
                  {accounts.map((account) => (
                    <Card key={account.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-center justify-between p-6">
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-secondary/50">
                              <Building className="w-5 h-5" />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {account.bank_name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {account.account_number} •{" "}
                                {account.beneficiary_name}
                              </p>
                              {account.verified && (
                                <div className="flex items-center mt-1 text-xs text-green-600">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Verified
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(account)}
                            >
                              <Pencil className="w-4 h-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <Trash2 className="w-4 h-4 text-destructive" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently delete this bank
                                    account. This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(account.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rest of code for withdrawal tab remains unchanged */}
      </Tabs>
    </div>
  );
}
