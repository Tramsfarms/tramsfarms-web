'use client';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import ProductsCarousel from '@/components/ProductsCarousel';
///import ProductsSection from "@/components/ProductsSection";
import { useEffect, useState, Suspense } from 'react';
import { ProductResponse } from '@/@types/AllProducts';
import axios from 'axios';
import constants from '../../utils/constant';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import ProductsLoader from '../components/ProductsLoader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { productService } from '@/utils/productService';
import { Product } from '@/types/product';
import { Skeleton } from '@/components/ui/skeleton';
import Totopbtn from './toTopBtn';

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
      image: '/carousel/image1.png',
      text1: 'Buy it Green',
      text2: 'Buy it Fresh',
    },
    {
      image: '/carousel/image2.png',
      text1: 'Buy it Green',
      text2: 'Buy it Fresh',
    },
    {
      image: '/carousel/image3.png',
      text1: 'Buy it Green',
      text2: 'Buy it Fresh',
    },
    {
      image: '/carousel/image4.png',
      text1: 'Buy it Green',
      text2: 'Buy it Fresh',
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
      { src: '/images/banners/banner1.png', alt: 'Banner 1' },
      { src: '/images/banners/banner2.png', alt: 'Banner 2' },
    ],
    [
      { src: '/images/banners/banner3.png', alt: 'Banner 3' },
      { src: '/images/banners/banner4.png', alt: 'Banner 4' },
    ],
    [
      { src: '/images/banners/banner5.png', alt: 'Banner 5' },
      { src: '/images/banners/banner6.png', alt: 'Banner 6' },
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
      toast.error('An Error Occurred while trying to fetch data');
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
      toast.error('Failed to fetch big save products');
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
      toast.error('Failed to fetch recommended products');
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
      toast.error('Failed to fetch all products');
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
    <div className='w-screen h-screen overflow-x-hidden bg-white'>
      <Header />
      <div className='max-w-full  lg:-mt-10 p-3 rounded-lg h-52 sm:h-[400px] lg:p-14'>
        <Carousel autoSlide={true}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className='relative w-full h-full overflow-hidden rounded-lg'
            >
              <Image
                src={slide.image}
                alt={`Slide ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className='absolute inset-0 flex flex-col justify-center h-full pl-10 text-white bg-black bg-opacity-50 rounded-lg sm:p-4 sm:pl-20'>
                <h1 className='font-bold sm:text-2xl text-brand-300'>
                  {slide.text1}
                </h1>
                <h2 className='font-bold text-white sm:text-2xl'>
                  {slide.text2}
                </h2>
                <div className='inline-block sm:mt-4'>
                  <button className='px-2 text-white border border-white rounded-md sm:py-2 sm:px-4'>
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      {/**Recommended */}
      <Suspense
        fallback={<div className='p-5'>Loading Recommended products...</div>}
      >
        <div className=' max-w-full lg:-mt-8 lg:p-0 p-3 lg:container '>
          <div className='lg:container'>
            <h1 className='text-lg p-4  font-bold text-grays-900 md:text-2xl'>
              Recommended
            </h1>
          </div>
          <div className='lg:container grid max-w-full lg:-mt-7 grid-cols-2 gap-2 lg:p-10 sm:gap-4 lg:gap-8 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5'>
            {isRecommendedLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <ProductsLoader key={index} />
              ))
            ) : recommendedProducts.length === 0 ? (
              <p className='col-span-full text-center text-gray-500'>
                No products available.
              </p>
            ) : (
              recommendedProducts
                .slice(0, 10)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            )}
          </div>
          {recommendedTotalPages > 1 && (
            <div className='flex items-center justify-center mt-8 space-x-4'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => handleRecommendedPageChange(recommendedPage - 1)}
                disabled={recommendedPage === 1}
              >
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <span className='text-sm'>
                Page {recommendedPage} of {recommendedTotalPages}
              </span>
              <Button
                variant='outline'
                size='icon'
                onClick={() => handleRecommendedPageChange(recommendedPage + 1)}
                disabled={recommendedPage === recommendedTotalPages}
              >
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          )}
        </div>
      </Suspense>
      {/** All Categories */}
      <Suspense
        fallback={<div className='p-5'>Loading All Categories products...</div>}
      >
        <div className='max-w-full p-3 lg:-mt-4 lg:p-14'>
          <div className='flex items-center lg:-mt-14 justify-between '>
            <h1 className='text-lg font-bold text-grays-900 md:text-2xl'>
              All Categories
            </h1>

            <Link href='/products/all/recommended'>
              <Button className='text-white border-primary' variant='primary'>
                See all
              </Button>
            </Link>
          </div>
          <div className='grid max-w-full grid-cols-2 lg:-mt-4 gap-2 mt-10 sm:gap-4 lg:gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {isAllProductsLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <ProductsLoader key={index} />
              ))
            ) : allProducts.length > 0 ? (
              allProducts
                .slice(0, 10)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            ) : (
              <p>No products available.</p>
            )}
          </div>

          {allProductsTotalPages > 1 && (
            <div className='flex items-center justify-center mt-8 space-x-4'>
              <Button
                variant='outline'
                size='icon'
                onClick={() => handleAllProductsPageChange(allProductsPage - 1)}
                disabled={allProductsPage === 1}
              >
                <ChevronLeft className='w-4 h-4' />
              </Button>
              <span className='text-sm'>
                Page {allProductsPage} of {allProductsTotalPages}
              </span>
              <Button
                variant='outline'
                size='icon'
                onClick={() => handleAllProductsPageChange(allProductsPage + 1)}
                disabled={allProductsPage === allProductsTotalPages}
              >
                <ChevronRight className='w-4 h-4' />
              </Button>
            </div>
          )}
        </div>
      </Suspense>

      <Footer />
      <Totopbtn />
    </div>
  );
}
