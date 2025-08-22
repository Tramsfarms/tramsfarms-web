"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Trash2, Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/CartStore";
import { formatCurrency } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import constants from "@/utils/constant";

const { API_URL } = constants;

export default function page() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, totalCost } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleIncreaseQuantity = (item: any) => {
    const currentQuantity = item.quantity || 1;
    updateQuantity(item, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (item: any) => {
    const currentQuantity = item.quantity || 1;
    if (currentQuantity > 1) {
      updateQuantity(item, currentQuantity - 1);
    } else {
      removeFromCart(item);
    }
  };

  const createOrder = async () => {
    try {
      setIsLoading(true);
      const token = Cookies.get("vendors_auth_token");

      if (!token) {
        toast.error("Please login to continue");
        router.push("/login");
        return;
      }

      const formattedCart = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity || 1,
      }));

      const response = await axios.post(
        `${API_URL}order`,
        {
          items: formattedCart,
          payment_method: "paystack",
          address: null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.order?.id) {
        const orderId = response.data.order.id;
        router.push(`/checkout/${orderId}`);
      } else {
        toast.error("Invalid order response from server");
      }
    } catch (error: any) {
      toast.error(
        `Failed to create order: ${error.message || "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <div className="container px-5 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Your cart is empty</h1>
              <p className="mt-2 text-muted-foreground">
                Add some products to your cart to see them here
              </p>
              <Button className="mt-4" onClick={() => router.push("/")}>
                Continue Shopping
              </Button>
            </div>
          </div>
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
          <h1 className="mb-8 text-2xl font-bold">Shopping Cart</h1>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow"
                >
                  <div className="relative w-24 h-24">
                    <Image
                      src={item.images[0]?.image_path || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex items-center mt-2 space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => handleDecreaseQuantity(item)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center">
                        {item.quantity || 1}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="mt-2 font-medium">
                      {formatCurrency(
                        parseFloat(item.sale_price) * (item.quantity || 1)
                      )}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            <div className="lg:col-span-1">
              <div className="p-4 space-y-4 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(totalCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(totalCost)}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={createOrder}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
