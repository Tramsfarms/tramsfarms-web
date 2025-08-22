"use client";

import { CardFooter } from "@/components/ui/card";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useRegisterFormStore from "@/stores/registerStore";
import constant from "@/utils/constant";

export default function CompleteRegistrationPage() {
  const router = useRouter();
  const { API_URL } = constant;

  const {
    fullname,
    user_type,
    farm_name,
    farm_address,
    farm_image,
    farm_description,
    email,
    password,
    phone_number,
    setEmail,
    setPassword,
    setPhoneNumber,
  } = useRegisterFormStore();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !phone_number) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("user_type", user_type);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone_number", phone_number);

      if (user_type === "seller" || user_type === "wholesale") {
        // Convert base64 image to file if needed
        if (farm_image && farm_image.startsWith("data:image")) {
          const blob = await fetch(farm_image).then((r) => r.blob());
          const file = new File([blob], "farm_image.jpg", {
            type: "image/jpeg",
          });
          formData.append("farm_image", file);
        } else if (farm_image) {
          formData.append("farm_image", farm_image);
        }

        formData.append("farm_name", farm_name);
        formData.append("farm_address", farm_address);

        if (farm_description) {
          formData.append("farm_description", farm_description);
        }
      }

      const response = await axios.post(`${API_URL}register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      toast.success("Registration completed successfully!");

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 1500);
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
        toast.error("An error occurred during registration.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-muted/30">
      <div className="w-full max-w-lg space-y-8">
        {" "}
        {/* Updated max-width */}
        <Card className="shadow-md border-muted/60">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Complete Registration
            </CardTitle>
            <CardDescription>
              Just a few more details to finish setting up your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">
                      {showPassword ? "Hide password" : "Show password"}
                    </span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone_number}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                variant={"primary"}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Complete Registration"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="w-full space-y-4">
              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Registration Summary</h3>
                <div className="p-3 text-sm rounded-md bg-muted">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Full Name:</span>
                    <span className="font-medium">{fullname}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Account Type:</span>
                    <span className="font-medium capitalize">
                      {user_type === "wholesale" ? "Wholesaler" : user_type}
                    </span>
                  </div>
                  {(user_type === "seller" || user_type === "wholesale") && (
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Farm Name:</span>
                      <span className="font-medium">{farm_name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
