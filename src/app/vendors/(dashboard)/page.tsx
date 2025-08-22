"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Download, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useOrders } from "@/hooks/use-orders";
import { formatDate } from "@/lib/utils";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the type for our data
interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  price: string;
  product: {
    id: number;
    name: string;
    sale_price: string;
    product_measurement_unit: string;
  };
}

interface Order {
  id: string;
  items: OrderItem[];
  total_amount: number;
  created_at: string;
  status: "pending" | "failed" | "in_progress" | "completed";
  order: {
    user: {
      fullname: string;
      phone_number: string;
      address: string;
    };
  };
}

// Status badge variants mapping
const statusVariants = {
  pending: "warning",
  failed: "destructive",
  in_progress: "secondary",
  completed: "success",
} as const;

export default function OrdersPage() {
  const { vendorOrders: orders, isLoading } = useOrders();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
    },
    {
      accessorKey: "items",
      header: "Products",
      cell: ({ row }) => {
        const items = row.original.items;
        return (
          <div className="flex items-center">
            <span>{`${items.length} ${
              items.length === 1 ? "product" : "products"
            }`}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              onClick={() => setSelectedOrder(row.original)}
            >
              <Eye className="w-4 h-4" />
              <span className="sr-only">View details</span>
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: "total_amount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sale Price
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      ),
      cell: ({ row }) => {
        const amount = row.original.total_amount;
        const formatted = new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(amount);
        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "created_at",
      header: "Date",
      cell: ({ row }) => formatDate(row.original.created_at),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={statusVariants[status]}>
            {status.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedOrder(row.original)}
          >
            View Details
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: orders || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToCSV = () => {
    if (!orders?.length) {
      toast.error("No data to export");
      return;
    }

    const headers = columns
      .map((column) => (typeof column.header === "string" ? column.header : ""))
      .join(",");

    const rows = orders.map((order) =>
      columns
        .map((column) => {
          const key = column.header as keyof Order;
          if (key === "items") {
            return `"${order.items.length} products"`;
          }
          const value = order[key];
          return `"${value ?? ""}"`;
        })
        .join(",")
    );

    const csv = [headers, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 w-full p-5 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage and track your orders here.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"primary"} onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 my-4 md:flex-row md:items-center">
        <Input
          placeholder="Filter orders..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Status <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {["all", "pending", "failed", "in_progress", "completed"].map(
              (status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  className="capitalize"
                  checked={
                    status === "all"
                      ? !table.getColumn("status")?.getFilterValue()
                      : table.getColumn("status")?.getFilterValue() === status
                  }
                  onCheckedChange={() => {
                    if (status === "all") {
                      table.getColumn("status")?.setFilterValue(undefined);
                    } else {
                      table.getColumn("status")?.setFilterValue(status);
                    }
                  }}
                >
                  {status.replace("_", " ")}
                </DropdownMenuCheckboxItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={(open) => !open && setSelectedOrder(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>Order #{selectedOrder?.id}</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Order Status */}
            <div className="flex items-center justify-between">
              <span className="font-medium">Status:</span>
              {selectedOrder && (
                <Badge variant={statusVariants[selectedOrder.status]}>
                  {selectedOrder.status.replace("_", " ")}
                </Badge>
              )}
            </div>

            {/* Customer Information */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Customer Information</h3>
              <div className="p-3 text-sm rounded-md bg-muted">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {selectedOrder?.order?.user?.fullname || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {selectedOrder?.order?.user?.phone_number || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {selectedOrder?.order?.user?.address || "N/A"}
                </p>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Products</h3>
              <div className="border divide-y rounded-md">
                <div className="grid grid-cols-12 p-3 text-sm font-medium bg-muted">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {selectedOrder?.items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 p-3 text-sm">
                    <div className="col-span-6">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.product.product_measurement_unit}
                      </p>
                    </div>
                    <div className="col-span-2 text-center">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(Number(item.price))}
                    </div>
                    <div className="col-span-2 text-center">
                      {item.quantity}
                    </div>
                    <div className="col-span-2 font-medium text-right">
                      {new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(Number(item.price) * item.quantity)}
                    </div>
                  </div>
                ))}

                {/* Order Total */}
                <div className="grid grid-cols-12 p-3 bg-muted">
                  <div className="col-span-10 font-medium text-right">
                    Total:
                  </div>
                  <div className="col-span-2 font-bold text-right">
                    {selectedOrder &&
                      new Intl.NumberFormat("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      }).format(selectedOrder.total_amount)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
