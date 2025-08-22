"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Wallet } from "lucide-react";
import { paymentService } from "@/utils/paymentService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

interface WithdrawalHistory {
  id: string;
  amount: number;
  bankName: string;
  accountNumber: string;
  status: "pending" | "completed" | "failed";
  date: string;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}

export default function WalletPage() {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState<number>(1000);
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(0);
  const [withdrawalHistory, setWithdrawalHistory] = useState<
    WithdrawalHistory[]
  >([]);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [balanceResponse, accountsResponse, withdrawalsResponse] =
        await Promise.all([
          paymentService.getUserBalance(),
          paymentService.getPaymentAccounts(),
          paymentService.getWithdrawalHistory(),
        ]);

      setBalance(balanceResponse.data.balance || 0);
      setBankAccounts(
        accountsResponse.data.map((account: any) => ({
          id: account.id.toString(),
          bankName: account.bank_name,
          accountNumber: account.account_number,
          accountName: account.beneficiary_name,
        }))
      );
      setWithdrawalHistory(
        withdrawalsResponse.data.map((withdrawal: any) => ({
          id: withdrawal.id.toString(),
          amount: withdrawal.amount,
          bankName: withdrawal.bank.bank_name,
          accountNumber: withdrawal.bank.account_number,
          status: withdrawal.status,
          date: withdrawal.created_at,
        }))
      );
    } catch (error) {
      toast.error("Failed to load account data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleWithdrawal = async () => {
    try {
      if (!selectedAccount || !amount || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      if (Number(amount) > balance) {
        toast.error("Amount exceeds available balance");
        return;
      }

      const body = {
        amount: amount,
        bank_account_id: selectedAccount,
        password: password,
      };

      const response = await paymentService.requestWithdrawal(body);

      if (response.status) {
        toast.success("Withdrawal processed successfully");
      } else {
        // If the withdrawal was rejected
        toast.error(response.message || "Withdrawal failed");
      }

      setIsWithdrawOpen(false);
      setAmount(1000);
      setPassword("");
      setSelectedAccount("");
      fetchData();
    } catch (error: any) {
      console.error("Withdrawal failed:", error);
      if (error.response?.data?.errors) {
        // Handle validation errors
        Object.entries(error.response.data.errors).forEach(
          ([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((message: string) => {
                toast.error(`${field}: ${message}`);
              });
            }
          }
        );
      } else {
        toast.error(error.response?.data?.message || "Withdrawal failed");
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
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

      {/* Balance and Withdrawal Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{formatCurrency(balance)}</p>
              </div>
            </div>

            <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
              <DialogTrigger asChild>
                <Button className="w-full" variant={"primary"} size="lg">
                  Withdraw Funds
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                  <DialogDescription>
                    Enter the amount and select the bank account for withdrawal.
                  </DialogDescription>
                </DialogHeader>
                <div className="pt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount to Withdraw</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value))}
                    />
                    {Number(amount) > balance && (
                      <p className="text-sm text-destructive">
                        Amount exceeds available balance
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="account">Select Bank Account</Label>
                    <Select
                      value={selectedAccount}
                      onValueChange={setSelectedAccount}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bank account" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankAccounts.map((account) => (
                          <SelectItem key={account.id} value={account.id}>
                            {account.bankName} - {account.accountNumber}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleWithdrawal}
                    disabled={
                      !selectedAccount ||
                      !amount ||
                      !password ||
                      Number(amount) > balance
                    }
                  >
                    Withdraw {amount && formatCurrency(Number(amount))}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Withdrawal History */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Bank</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawalHistory.map((withdrawal) => (
                  <TableRow key={withdrawal.id}>
                    <TableCell>
                      {format(new Date(withdrawal.date), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(withdrawal.amount)}
                    </TableCell>
                    <TableCell>
                      {withdrawal.bankName}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {withdrawal.accountNumber}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          withdrawal.status === "completed"
                            ? "success"
                            : withdrawal.status === "pending"
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {withdrawal.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {withdrawalHistory.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center text-muted-foreground"
                    >
                      No withdrawal history found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
