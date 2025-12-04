'use client';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Carousel from '@/components/Carousel';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { ProductResponse } from '@/@types/AllProducts';
import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import constants from '../../../../../utils/constant';
import { toast } from 'react-toastify';
import Slider from 'react-slick';
import { CategoryResponse } from '@/@types/CategoriesResponse';
import ProductsLoader from '@/components/ProductsLoader';

export default function page(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
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

  const [products, setProducts] = useState<CategoryResponse[]>();

  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<CategoryResponse[]>(
        `${API_URL}products/category/${params.slug}`
      );

      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      //toast.error("An Error Occurred while trying to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const [acceptTerms, setAcceptTerms] = useState(false);
  return (
    <div className='w-screen h-screen overflow-x-hidden bg-white'>
      <Header />
      <div className='max-w-full p-3 rounded-lg h-52 sm:h-[400px] lg:-mt-8 lg:p-14'>
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
                <h1 className='font-sans font-bold sm:text-2xl text-brand-300'>
                  {slide.text1}
                </h1>
                <h2 className='font-sans font-bold text-white sm:text-2xl'>
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
      <div className='max-w-full p-3 lg:container lg:-mt-9'>
        <div className='flex items-center justify-between lg:px-12'>
          <h1 className='font-sans text-lg font-bold text-grays-900 md:text-2xl'>
            {params.slug.charAt(0).toUpperCase() + params.slug.slice(1)}
          </h1>
        </div>
        <div className='grid max-w-full grid-cols-2 gap-2 lg:p-14 sm:gap-4 lg:gap-8 sm:grid-cols-3 lg:-mt-5 md:grid-cols-4 lg:grid-cols-5'>
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <ProductsLoader key={index} />
            ))
          ) : products && products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 p-3 lg:p-14'>
        <div className='max-w-full rounded-lg h-24 sm:h-[200px] lg:h-[400px]'>
          <img
            src='/images/banners/banner3.png'
            alt={`Slide `}
            className='w-full h-full rounded-lg'
          />
        </div>
        <div className='max-w-full  rounded-lg h-24 sm:h-[200px] lg:h-[400px]'>
          <img
            src='/images/banners/banner4.png'
            alt={`Slide `}
            className='w-full h-full rounded-lg'
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}
