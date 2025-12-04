"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ArrowLeft, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import constant from "@/utils/constant";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { API_URL } = constant;
  const router = useRouter();

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      // Redirect to forgot password if no email is found
      router.push("/forgot-password");
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter the verification code");
      return;
    }

    setIsLoading(true);

    try {
      const myHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      const data = {
        email: email,
        otp: otp,
      };

      const response = await axios.post(`${API_URL}password/verify-otp`, data, {
        headers: myHeaders,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Code verified successfully");
        router.push("/reset-password");
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
        toast.error("Failed to verify code. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error("Email address not found");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}password/email`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      toast.success("Verification code resent to your email");
    } catch (error) {
      toast.error("Failed to resend verification code");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-muted/30">
      <div className="w-full max-w-lg space-y-8">
        <Card className="shadow-md border-muted/60">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Check your email
            </CardTitle>
            <CardDescription>
              We sent a verification code to{" "}
              <span className="font-medium">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="p-3 mb-4 rounded-full bg-primary/10">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-center text-muted-foreground">
                Enter the 5-digit code sent to your email to continue with
                password reset
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={5}
                  placeholder="Enter 5-digit code"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="text-lg tracking-widest text-center"
                  required
                />
              </div>

              <Button
                variant={"primary"}
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Code"
                )}
              </Button>

              <div className="text-center">
                <Button variant="link" type="button" onClick={handleResendCode}>
                  Didn't receive the code? Resend
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="link" asChild>
              <Link href="/forgot-password">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to forgot password
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="flex justify-center">
          <img
            src="/images/logo/BWT.svg"
            alt="Tramsfarms Logo"
            className="h-10"
          />
        </div>
      </div>
    </div>
  );
}
