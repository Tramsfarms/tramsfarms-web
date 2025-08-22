"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Shield } from "lucide-react";
import dynamic from "next/dynamic";
const PaystackConsumer = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackConsumer),
  { ssr: false }
);

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/CartStore";
import { formatCurrency } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import constants from "@/utils/constant";

const { API_URL } = constants;

export default function CheckoutPage(props: {
  params: Promise<{ order_id: string }>;
}) {
  const params = use(props.params);
  const router = useRouter();
  const { cart, totalCost } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
      return;
    }

    // Fetch order details
    const fetchOrderDetails = async () => {
      try {
        const token = Cookies.get("vendors_auth_token");
        const response = await axios.get(
          `${API_URL}orders/${params.order_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderDetails(response.data);
      } catch (error) {
        toast.error("Failed to fetch order details");
        router.push("/carts");
      }
    };

    fetchOrderDetails();
  }, [cart.length, router, params.order_id]);

  const handlePaystackSuccess = async () => {
    try {
      const token = Cookies.get("vendors_auth_token");
      const paymentReference = `ord_${Date.now()}`;

      await axios.post(
        `${API_URL}order/update/${params.order_id}`,
        {
          payment_reference: paymentReference,
          payment_method: "paystack",
          amount: totalCost,
          status: "completed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Payment successful!");
      router.push("/user");
    } catch (error: any) {
      toast.error(
        `Failed to verify payment: ${error.message || "Unknown error"}`
      );
    }
  };

  const handlePaystackClose = async () => {
    try {
      const token = Cookies.get("vendors_auth_token");
      const paymentReference = `ord_${Date.now()}`;

      await axios.post(
        `${API_URL}order/update/${params.order_id}`,
        {
          payment_reference: paymentReference,
          payment_method: "paystack",
          amount: totalCost,
          status: "failed",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.error("Payment cancelled");
      router.push("/carts");
    } catch (error: any) {
      toast.error(
        `Failed to update order status: ${error.message || "Unknown error"}`
      );
    }
  };

  if (!orderDetails) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center flex-1">
          <div>Loading order details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="container px-5 py-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative flex-shrink-0 w-16 h-16 overflow-hidden rounded-md">
                      <Image
                        src={item.images[0]?.image_path || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex justify-between flex-1">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatCurrency(
                          parseFloat(item.sale_price) * (item.quantity || 1)
                        )}
                      </p>
                    </div>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totalCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(totalCost)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PaystackConsumer
                  publicKey="pk_live_6c2bcf431d0a0e1f3a21f30cb416ad4d04383bd9"
                  email="user@example.com"
                  amount={totalCost * 100}
                  currency="NGN"
                  reference={`ord_${Date.now()}`}
                  onSuccess={handlePaystackSuccess}
                  onClose={handlePaystackClose}
                >
                  {({ initializePayment }) => (
                    <Button
                      className="w-full"
                      size="lg"
                      variant="primary"
                      onClick={() => initializePayment()}
                      disabled={isLoading}
                    >
                      {isLoading ? "Processing..." : "Pay with Paystack"}
                    </Button>
                  )}
                </PaystackConsumer>
                <div className="flex flex-col gap-2 text-sm text-center">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <Shield className="w-4 h-4" />
                    <span>Secure Payment</span>
                  </div>
                  <p className="text-muted-foreground">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
