"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Plus, Trash2, ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import constants from "@/utils/constant";

export default function AddProductPage() {
  const { API_URL } = constants;
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [productCode, setProductCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState("");
  const [productMeasurementUnit, setProductMeasurementUnit] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const [unit, setUnit] = useState("");

  const unitOptions = [
    "Kilograms (kg)",
    "Grams (g)",
    "Metric Tons (ton)",
    "Liters (L)",
    "Per Unit",
    "Bunch",
    "Bundle",
    "Box",
    "Crate",
    "Tray",
  ];

  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}categories`);
      setCategories(response.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file;
      setImages(updatedImages);
    }
  };

  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category_id", categoryId);
      if (subcategoryId) formData.append("subcategory_id", subcategoryId);
      if (productCode) formData.append("product_code", productCode);
      if (quantity) formData.append("quantity", quantity);
      if (marketPrice) formData.append("market_price", marketPrice);
      formData.append("sale_price", salePrice);
      if (saleDate) formData.append("sale_date", saleDate);
      if (minimumOrderQuantity)
        formData.append("minimum_order_quantity", minimumOrderQuantity);
      if (productMeasurementUnit) {
        formData.append("product_measurement_unit", productMeasurementUnit);
      } else {
        formData.append("product_measurement_unit", "Per Unit"); // Default value
      }

      images.forEach((image, index) => {
        if (image) {
          formData.append(`images[${index}]`, image);
        }
      });

      const token = await Cookies.get("vendors_auth_token");
      const response = await axios.post(`${API_URL}products`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message || "Product added successfully");
      router.push("/vendors/products");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((field) => {
          error.response.data.errors[field].forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        });
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unknown error occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []); // Removed API_URL as a dependency

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" size="sm" asChild className="mb-2">
            <Link href="/vendors/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Add New Product</h1>
          <p className="text-muted-foreground">Create a new product listing</p>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Product Images</h2>
              <p className="text-sm text-muted-foreground">
                Add up to 4 images of your product. The first image will be used
                as the cover.
              </p>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex flex-col items-center justify-center overflow-hidden border border-dashed rounded-md aspect-square border-muted-foreground/25"
                  >
                    {image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute w-6 h-6 top-2 right-2"
                          onClick={() => handleDeleteImage(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                          <span className="sr-only">Delete image</span>
                        </Button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleImageChange(e, index)}
                        />
                        <Plus className="w-8 h-8 text-muted-foreground/50" />
                        <span className="mt-2 text-xs text-muted-foreground">
                          Add Image
                        </span>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Product Information</h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit of Measurement</Label>
                  <Select
                    value={productMeasurementUnit}
                    onValueChange={setProductMeasurementUnit}
                  >
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {unitOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="minimumOrderQuantity">
                    Minimum Order Quantity
                  </Label>
                  <Input
                    id="minimumOrderQuantity"
                    type="number"
                    placeholder="Enter minimum order quantity"
                    value={minimumOrderQuantity}
                    onChange={(e) => setMinimumOrderQuantity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salePrice">
                    Sale Price <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="salePrice"
                    type="number"
                    placeholder="Enter price"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your product in detail"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button
                variant={"primary"}
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-2 -ml-1 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
