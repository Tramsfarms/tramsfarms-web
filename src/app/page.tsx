"use client";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";
import Link from "next/link";
import ProductCard from "../components/ProductCard";
import ProductsCarousel from "@/components/ProductsCarousel";
///import ProductsSection from "@/components/ProductsSection";
import { useEffect, useState, Suspense } from "react";
import { ProductResponse } from "@/@types/AllProducts";
import axios from "axios";
import constants from "../../utils/constant";
import { toast } from "react-toastify";
import Slider from "react-slick";
import ProductsLoader from "../components/ProductsLoader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { productService } from "@/utils/productService";
import { Product } from "@/types/product";

export default function Home() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const slides = [
    {
      image: "/carousel/image1.png",
      text1: "Buy it Green",
      text2: "Buy it Fresh",
    },
    {
      image: "/carousel/image2.png",
      text1: "Buy it Green",
      text2: "Buy it Fresh",
    },
    {
      image: "/carousel/image3.png",
      text1: "Buy it Green",
      text2: "Buy it Fresh",
    },
    {
      image: "/carousel/image4.png",
      text1: "Buy it Green",
      text2: "Buy it Fresh",
    },
  ];

  const { API_URL } = constants;

  const [products, setProducts] = useState<ProductResponse>();
  const [bigSaveProducts, setBigSaveProducts] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const [bigSavePage, setBigSavePage] = useState(1);
  const [recommendedPage, setRecommendedPage] = useState(1);
  const [allProductsPage, setAllProductsPage] = useState(1);

  const [bigSaveTotalPages, setBigSaveTotalPages] = useState(1);
  const [recommendedTotalPages, setRecommendedTotalPages] = useState(1);
  const [allProductsTotalPages, setAllProductsTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isBigSaveLoading, setIsBigSaveLoading] = useState(false);
  const [isRecommendedLoading, setIsRecommendedLoading] = useState(false);
  const [isAllProductsLoading, setIsAllProductsLoading] = useState(false);

  // Banner pagination state
  const [currentBannerPage, setCurrentBannerPage] = useState(1);

  // Banner data - each page has 2 banners
  const bannerPages = [
    [
      { src: "/images/banners/banner1.png", alt: "Banner 1" },
      { src: "/images/banners/banner2.png", alt: "Banner 2" },
    ],
    [
      { src: "/images/banners/banner3.png", alt: "Banner 3" },
      { src: "/images/banners/banner4.png", alt: "Banner 4" },
    ],
    [
      { src: "/images/banners/banner5.png", alt: "Banner 5" },
      { src: "/images/banners/banner6.png", alt: "Banner 6" },
    ],
  ];

  // Banner pagination handlers
  const handlePrevBannerPage = () => {
    if (currentBannerPage > 1) {
      setCurrentBannerPage(currentBannerPage - 1);
    }
  };

  const handleNextBannerPage = () => {
    if (currentBannerPage < bannerPages.length) {
      setCurrentBannerPage(currentBannerPage + 1);
    }
  };

  const getProducts = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const response = await productService.getProducts(page, 15);
      setProducts(response);
      setAllProducts(response.data.all_products);
      setRecommendedProducts(response.data.recommended);
      setBigSaveProducts(response.data.big_save);
      setAllProductsTotalPages(response.last_page || 1);
      setAllProductsPage(page);
    } catch (error) {
      toast.error("An Error Occurred while trying to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBigSaveProducts = async (page: number) => {
    setIsBigSaveLoading(true);
    try {
      const response = await productService.getBigSaveProducts(page);
      setBigSaveProducts(response.data.data);
      setBigSaveTotalPages(response.data.last_page);
    } catch (error) {
      toast.error("Failed to fetch big save products");
    } finally {
      setIsBigSaveLoading(false);
    }
  };

  const fetchRecommendedProducts = async (page: number) => {
    setIsRecommendedLoading(true);
    try {
      const response = await productService.getRecommendedProducts(page);
      setRecommendedProducts(response.data.data);
      setRecommendedTotalPages(response.data.last_page);
    } catch (error) {
      toast.error("Failed to fetch recommended products");
    } finally {
      setIsRecommendedLoading(false);
    }
  };

  const fetchAllProducts = async (page: number) => {
    setIsAllProductsLoading(true);
    try {
      const response = await productService.getPaginatedProducts(page);
      setAllProducts(response.data.data);
      setAllProductsTotalPages(response.data.last_page);
    } catch (error) {
      toast.error("Failed to fetch all products");
    } finally {
      setIsAllProductsLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  const handleBigSavePageChange = (page: number) => {
    setBigSavePage(page);
    fetchBigSaveProducts(page);
  };

  const handleRecommendedPageChange = (page: number) => {
    setRecommendedPage(page);
    fetchRecommendedProducts(page);
  };

  const handleAllProductsPageChange = (page: number) => {
    getProducts(page);
  };

  return (
    <div className="w-screen h-screen overflow-x-hidden bg-white">
      <Header />
      <div className="max-w-full p-3 rounded-lg h-52 sm:h-[400px] lg:p-14">
        <Carousel autoSlide={true}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative w-full h-full overflow-hidden rounded-lg"
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
              />

              <div className="absolute inset-0 flex flex-col justify-center h-full pl-10 text-white bg-black bg-opacity-50 rounded-lg sm:p-4 sm:pl-20">
                <h1 className="font-bold sm:text-2xl text-brand-300">
                  {slide.text1}
                </h1>
                <h2 className="font-bold text-white sm:text-2xl">
                  {slide.text2}
                </h2>

                <div className="inline-block sm:mt-4">
                  <button className="px-2 text-white border border-white rounded-md sm:py-2 sm:px-4">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/* <div className="max-w-full p-5 mt-2 h-72 lg:p-14">
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="text-xl font-bold md:text-4xl text-brand-500">
            Welcome Deal, 50% off
          </h1>
          <h3 className="text-sm font-normal md:text-2xl">
            Buy it green, buy it fresh
          </h3>
        </div>

        <div className="max-w-full mt-2 md:p-5 h-72 ">
          <div className="grid grid-cols-6 grid-rows-3 gap-1 md:gap-4 md:h-[500px]">
            <div className="col-span-1 row-span-3 bg-blue-300">
              <img
                src="/carousel/image1.png"
                alt="Image 1"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
            <div className="col-span-2 row-span-3 bg-red-300">
              <img
                src="/carousel/image2.png"
                alt="Image 2"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            <div className="col-span-3 row-span-2 bg-green-300">
              <img
                src="/carousel/image3.png"
                alt="Image 3"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>

            <div className="col-span-3 row-span-1 bg-yellow-300">
              <img
                src="/carousel/image1.png"
                alt="Image 4"
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="max-w-full  p-0 rounded-lg h-0 sm:h-[400px] lg:p-14"></div>

      <Suspense
        fallback={<div className="p-5">Loading Big Save products...</div>}
      >
        <div className="h-auto max-w-full p-5 mt-5 lg:p-14 ">
          <div className="flex items-center justify-between md:p-5">
            <h1 className="text-lg font-bold text-grays-900 md:text-2xl">
              Big Save
            </h1>

            <Link
              className="text-xs font-normal uppercase text-brand-500 sm:text-lg"
              href="/products/all/big-save"
            >
              See all
            </Link>
          </div>
          <div className="grid max-w-full grid-cols-2 gap-2 lg:p-14 sm:gap-4 lg:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {isBigSaveLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ProductsLoader key={index} />
              ))
            ) : bigSaveProducts.length > 0 ? (
              bigSaveProducts
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
              <p>No products available.</p>
            )}
          </div>

          {bigSaveTotalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleBigSavePageChange(bigSavePage - 1)}
                disabled={bigSavePage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                Page {bigSavePage} of {bigSaveTotalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleBigSavePageChange(bigSavePage + 1)}
                disabled={bigSavePage === bigSaveTotalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Suspense> */}

      {/* <div className="max-w-full  p-0 rounded-lg h-0 sm:h-[400px] lg:p-14"></div> */}

      {/** Banner */}

      {/* <div className="max-w-full relative p-3 rounded-lg h-32 sm:h-[250px] lg:h-[400px] lg:p-14">
        <img
          src="/images/banners/banner1.png"
          alt={`Slide `}
          className="w-full h-full rounded-lg"
        />
      </div> */}

      {/**Recommended */}
      <Suspense
        fallback={<div className="p-5">Loading Recommended products...</div>}
      >
        <div className="max-w-full p-5 mt-5 lg:p-14 ">
          <div className="flex items-center justify-between md:p-5">
            <h1 className="text-lg font-bold text-grays-900 md:text-2xl">
              Recommended
            </h1>

            <Link
              className="text-xs font-normal uppercase text-brand-500 sm:text-lg"
              href="/products/all/recommended"
            >
              See all
            </Link>
          </div>
          <div className="grid max-w-full grid-cols-2 gap-2 lg:p-14 sm:gap-4 lg:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {isRecommendedLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ProductsLoader key={index} />
              ))
            ) : recommendedProducts.length > 0 ? (
              recommendedProducts
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
              <p>No products available.</p>
            )}
          </div>

          {recommendedTotalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRecommendedPageChange(recommendedPage - 1)}
                disabled={recommendedPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                Page {recommendedPage} of {recommendedTotalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleRecommendedPageChange(recommendedPage + 1)}
                disabled={recommendedPage === recommendedTotalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Suspense>

      {/** Banner page */}
      <div className="max-w-full p-3 rounded-lg h-32 sm:h-[250px] lg:h-[400px] lg:p-14">
        <img
          src="/images/banners/banner2.png"
          alt={`Slide `}
          className="w-full h-full rounded-lg"
        />
      </div>

      {/** All Categories */}
      <Suspense
        fallback={<div className="p-5">Loading All Categories products...</div>}
      >
        <div className="max-w-full p-3 lg:p-14">
          <div className="flex items-center justify-between lg:px-12">
            <h1 className="text-lg font-bold text-grays-900 md:text-2xl">
              All Categories
            </h1>
            <Link
              className="text-xs font-normal uppercase text-brand-500 sm:text-lg"
              href="/products/all"
            >
              See all
            </Link>
          </div>
          <div className="grid max-w-full grid-cols-2 gap-2 lg:p-14 sm:gap-4 lg:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {isAllProductsLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <ProductsLoader key={index} />
              ))
            ) : allProducts.length > 0 ? (
              allProducts
                .slice(0, 4)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
              <p>No products available.</p>
            )}
          </div>

          {allProductsTotalPages > 1 && (
            <div className="flex items-center justify-center mt-8 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAllProductsPageChange(allProductsPage - 1)}
                disabled={allProductsPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm">
                Page {allProductsPage} of {allProductsTotalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAllProductsPageChange(allProductsPage + 1)}
                disabled={allProductsPage === allProductsTotalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </Suspense>

      <div className="grid grid-cols-2 gap-4 p-3 lg:p-14">
        {bannerPages[currentBannerPage - 1].map((banner, index) => (
          <div
            key={index}
            className="max-w-full rounded-lg h-24 sm:h-[200px] lg:h-[400px]"
          >
            <img
              src={banner.src}
              alt={banner.alt}
              className="w-full h-full rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Banner Pagination */}
      <div className="flex items-center justify-center mt-4 mb-8 space-x-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevBannerPage}
          disabled={currentBannerPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm">
          Page {currentBannerPage} of {bannerPages.length}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextBannerPage}
          disabled={currentBannerPage === bannerPages.length}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <Footer />
    </div>
  );
}
