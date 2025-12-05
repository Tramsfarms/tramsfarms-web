"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import constants from "../../../../../../utils/constant";

export default function page() {
  const { API_URL } = constants;
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}categories`);

      // console.log(response.data);
      setCategories(response.data);
    } catch (error) {}
  };

  const router = useRouter();

  const [variants, setVariants] = useState([
    {
      vibration: "",
      quantity: "",
      startDate: "",
      endDate: "",
    },
  ]);

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        vibration: "",
        quantity: "",
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const [name, setName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [weight, setWeight] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [isLoading, setIsLoading] = useState(false);
  const [marketPrice, setMarketPrice] = useState("");
  const [salePrice, setSalePrice] = useState("");

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = file; // Save the file directly
      setImages(updatedImages);
      console.log(file);
    }
  };

  // Handle image deletion
  const handleDeleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null; // Reset image to null
    setImages(updatedImages);
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedVariants = [...variants];
    updatedVariants[index][name] = value;
    setVariants(updatedVariants);
  };

  const submit = async () => {
    try {
      const formData = new FormData();

      setIsLoading(true);

      const token = await Cookies.get("vendors_auth_token");

      const myHeaders = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      formData.append("name", name);
      formData.append("category_id", selectedCategory);
      formData.append("weight", weight);
      formData.append("description", description);
      formData.append("product_code", productCode);
      formData.append("quantity", variants[0].quantity);
      formData.append("market_price", marketPrice);
      formData.append("sale_price", salePrice);
      variants.forEach((variant, index) => {
        formData.append(`variants[${index}][variant_name]`, variant.vibration);
        formData.append(`variants[${index}][quantity]`, variant.quantity);
        formData.append(`variants[${index}][sale_date]`, variant.startDate);
        formData.append(`variants[${index}][endDate]`, variant.endDate);
      });
      images.forEach((image, index) => {
        if (image) {
          formData.append(`images[${index}]`, image);
        }
      });

      const response = await axios.post(`${API_URL}products`, formData, {
        headers: myHeaders,
      });

      console.log(response.data);
      toast.success(response.data.message);
      router.push("/vendors/products");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.errors) {
        Object.keys(error.response.data.errors).forEach((field) => {
          error.response.data.errors[field].forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        });
      } else if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
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
  }, []);

  return (
    <div className="p-5">
      <div>
        <div className="flex">
          <h3>Products</h3>
        </div>
        <h1 className="mt-5 text-lg md:text-2xl">Add products</h1>
      </div>
      <div className="flex flex-col mt-3 md:flex-row ">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center p-4 bg-white rounded-md"
            >
              {image ? (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index}`}
                    className="object-cover w-24 h-24 rounded-md"
                  />
                  {/* Delete icon */}
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1"
                    aria-label="Delete Image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, index)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none">
                      <path
                        fill="currentColor"
                        d="M10.5 20a1.5 1.5 0 0 0 3 0v-6.5H20a1.5 1.5 0 0 0 0-3h-6.5V4a1.5 1.5 0 0 0-3 0v6.5H4a1.5 1.5 0 0 0 0 3h6.5z"
                      />
                    </g>
                  </svg>
                  <span>Image</span>
                </label>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5 md:grid-cols-2">
        <input
          type="text"
          className="p-2 bg-white rounded-md outline-none focus:border-primary focus:border"
          placeholder="Name of the product"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          name=""
          id=""
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 bg-white rounded-md outline-none"
        >
          <option value="" disabled>
            Category
          </option>
          {categories.map((category, index) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5 md:grid-cols-2">
        <input
          type="text"
          className="p-2 bg-white rounded-md outline-none focus:border-primary focus:border"
          placeholder="Product Coupon Code"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
        />

        <input
          type="text"
          className="p-2 bg-white rounded-md outline-none focus:border-primary focus:border"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5 md:grid-cols-2">
        <input
          type="text"
          className="p-2 bg-white rounded-md outline-none focus:border-primary focus:border"
          placeholder="Market Price"
          name="marketPrice"
          value={marketPrice}
          onChange={(e) => setMarketPrice(e.target.value)}
        />
        <input
          type="text"
          className="p-2 bg-white rounded-md outline-none focus:border-primary focus:border"
          placeholder="Sale Price"
          name="salePrice"
          value={salePrice}
          onChange={(e) => setSalePrice(e.target.value)}
        />
      </div>
      <div className="grid w-full grid-cols-1 mt-5">
        <textarea
          name=""
          id=""
          rows={5}
          placeholder="Product Description"
          className="w-full p-2 rounded-md outline-none focus:border-primary focus:border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mt-5">
        <h1 className="font-sans font-bold">Variants</h1>
        {variants.map((variant, index) => (
          <div
            key={index}
            className="grid grid-cols-2 gap-4 mt-2 md:grid-cols-4"
          >
            <input
              type="text"
              className="p-2 bg-white rounded-md outline-none focus:border-primary focus:border"
              placeholder="Type"
              name="vibration"
              value={variant.vibration}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              className="p-2 bg-white rounded-md outline-none focus:border-primary focus:border"
              placeholder="Quantity"
              name="quantity"
              value={variant.quantity}
              onChange={(e) => handleInputChange(index, e)}
            />

            {/* <input
              type="date"
              className="p-2 rounded-md text-grays-400"
              placeholder="Start Date"
              name="startDate"
              value={variant.startDate}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="date"
              className="p-2 rounded-md text-grays-400"
              placeholder="End Date"
              name="endDate"
              value={variant.endDate}
              onChange={(e) => handleInputChange(index, e)}
            /> */}
          </div>
        ))}

        <button
          onClick={addVariant}
          className="p-2 mt-4 text-white rounded-md bg-brand-300"
        >
          Add Another Variant
        </button>
      </div>
      {/* <div className="grid w-full grid-cols-1 py-5 mt-5 border-t-2 border-t-black">
        <textarea
          name=""
          id=""
          rows={5}
          placeholder="Product Specification"
          className="w-full p-2 rounded-md outline-none focus:border-primary focus:border"
        ></textarea>
      </div> */}
      <div className="flex justify-end p-2">
        <button
          onClick={submit}
          className="flex justify-center p-2 text-white rounded-md bg-primary"
        >
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z"
                opacity="0.5"
              />
              <path
                fill="currentColor"
                d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"
              >
                <animateTransform
                  attributeName="transform"
                  dur="1s"
                  from="0 12 12"
                  repeatCount="indefinite"
                  to="360 12 12"
                  type="rotate"
                />
              </path>
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
}
