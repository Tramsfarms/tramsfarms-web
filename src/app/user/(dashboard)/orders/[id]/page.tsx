"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { orderService } from "@/utils/orderService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { formatDate, formatCurrency } from "@/lib/utils";
import { Loader2, FileText } from "lucide-react";

// Status badge colors
const statusVariants = {
  pending: "warning",
  processing: "secondary",
  completed: "success",
  cancelled: "destructive",
  rejected: "destructive",
  "in progress": "secondary",
  failed: "destructive",
} as const;

export default function OrderDetailsPage(props: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const params = use(props.params);

  useEffect(() => {
    async function fetchOrderData() {
      try {
        setLoading(true);
        const data = await orderService.getBuyerOrders();
        const foundOrder = data.data.find(
          (o: any) => o.id.toString() === params.id
        );

        if (!foundOrder) {
          toast.error("Order not found");
          router.push("/user/orders");
          return;
        }

        setOrder(foundOrder);
      } catch (error) {
        console.error("Error fetching order:", error);
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    }

    fetchOrderData();
  }, [params.id, router]);

  const handleUpdateStatus = async (
    subOrderId: number,
    status: "completed" | "cancelled"
  ) => {
    try {
      setUpdatingId(subOrderId);
      await orderService.updateSubOrderStatus(subOrderId, status);

      // Update local state
      setOrder((prev) => {
        if (!prev) return prev;
        const updatedSubOrders = prev.sub_orders.map((subOrder: any) =>
          subOrder.id === subOrderId ? { ...subOrder, status } : subOrder
        );
        return { ...prev, sub_orders: updatedSubOrders };
      });

      toast.success(`Order status updated to ${status}`);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDownloadReceipt = (vendorId?: number) => {
    try {
      orderService.generatePdfReceipt(order, vendorId);
    } catch (error) {
      console.error("Failed to generate receipt:", error);
      toast.error("Could not generate receipt. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container p-4 py-8 mx-auto text-center">
        <h1 className="text-2xl font-bold">Order Not Found</h1>
      </div>
    );
  }

  return (
    <div className="container p-4 py-8 mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>
          <p className="text-muted-foreground">Order #{params.id}</p>
        </div>
        <Button onClick={() => handleDownloadReceipt()} variant="primary">
          <FileText className="w-4 h-4 mr-2" />
          Download Receipt
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>Overview of your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Order Date
                </p>
                <p>{formatDate(order.created_at)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Status
                </p>
                <Badge
                  variant={
                    statusVariants[order.status as keyof typeof statusVariants]
                  }
                >
                  {order.status.replace("_", " ")}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Amount
                </p>
                <p className="font-medium">
                  {formatCurrency(order.total_amount)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Payment Method
                </p>
                <p className="capitalize">{order.payment_method}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Vendors</h2>

          {order.sub_orders?.map((subOrder: any) => (
            <Card key={subOrder.id} className="overflow-hidden">
              <CardHeader className="border-b bg-muted/50">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-base">
                      Vendor:{" "}
                      {subOrder.user.name || "Vendor #" + subOrder.user.id}
                    </CardTitle>
                    <CardDescription>
                      Amount: {formatCurrency(subOrder.total_amount)}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        statusVariants[
                          subOrder.status as keyof typeof statusVariants
                        ]
                      }
                    >
                      {subOrder.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDownloadReceipt(subOrder.user.id)}
                    >
                      <FileText className="w-3 h-3 mr-2" />
                      Vendor Receipt
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="divide-y">
                  {subOrder.items?.map((item: any) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4">
                      <div className="col-span-2">
                        <img
                          src={
                            item.product.images?.[0]?.url ||
                            "/images/placeholder.png"
                          }
                          alt={item.product.name}
                          className="object-cover w-full h-20 rounded-md"
                        />
                      </div>
                      <div className="col-span-6">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-col items-end justify-center col-span-4">
                        <p className="font-medium">
                          {formatCurrency(item.price)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total: {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 p-4 border-t">
                {subOrder.status === "processing" && (
                  <>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                          {updatingId === subOrder.id ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : null}
                          Cancel Order
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will cancel this part of your order from this
                            vendor.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Nevermind</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() =>
                              handleUpdateStatus(subOrder.id, "cancelled")
                            }
                            className="bg-destructive text-destructive-foreground"
                          >
                            Cancel Order
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <Button
                      disabled={updatingId === subOrder.id}
                      onClick={() =>
                        handleUpdateStatus(subOrder.id, "completed")
                      }
                    >
                      {updatingId === subOrder.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      Mark as Received
                    </Button>
                  </>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
