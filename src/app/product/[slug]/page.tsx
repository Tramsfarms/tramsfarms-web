'use client';

import type React from 'react';

import { useEffect, useState } from 'react';
import { use } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { ShoppingCart, CheckCircle, XCircle, Plus, Minus } from 'lucide-react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import type { Product, ProductResponse } from '@/@types/AllProducts';
import { useCartStore } from '@/stores/CartStore';
import { formatCurrency } from '@/lib/utils';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ChatComponent from '@/components/ChatComponent';
import constant from '@/utils/constant';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = use(props.params);
  const [product, setProduct] = useState<Product>();
  const [products, setProducts] = useState<ProductResponse>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();
  const { API_URL } = constant;
  const router = useRouter();

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}product/${params.slug}`);
      setProduct(response.data.data);
      // Initialize quantity with minimum order quantity if available
      if (response.data.data?.minimum_order_quantity) {
        setQuantity(response.data.data.minimum_order_quantity);
      }
    } catch (error) {
      toast.error('Failed to fetch product details');
    } finally {
      setIsLoading(false);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}products`);
      setProducts(response.data);
    } catch (error) {
      toast.error('Failed to fetch similar products');
    }
  };

  useEffect(() => {
    getProduct();
    getProducts();
  }, [params]);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > (product?.minimum_order_quantity || 1)) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value >= (product?.minimum_order_quantity || 1)) {
      setQuantity(value);
    } else if (!isNaN(value)) {
      setQuantity(product?.minimum_order_quantity || 1);
    }
  };

  const handleAddToCart = () => {
    const user = Cookies.get('vendors_auth_token');

    if (!user) {
      toast.error('Please login to add to cart');
      router.push('/register');
      return;
    }

    if (!product) {
      return;
    }

    if (quantity < (product.minimum_order_quantity || 1)) {
      toast.error(
        `Minimum order quantity is ${product.minimum_order_quantity}`
      );
      return;
    }

    addToCart({
      ...product,
      quantity,
    });
    toast.success(
      `${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart`
    );
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='lg:container px-4 py-6 md:py-8'>
        <div className='grid gap-6 lg:gap-12 md:grid-cols-2'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='relative overflow-hidden border rounded-lg aspect-square'>
              <Image
                src={
                  product?.images[selectedImageIndex]?.image_path ||
                  '/images/products.png' ||
                  '/placeholder.svg'
                }
                alt={product?.name || 'Product image'}
                fill
                className='object-cover'
                //priority
              />
            </div>

            {product?.images.length > 1 && (
              <ScrollArea>
                <div className='flex gap-2 pb-4 mt-3'>
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square h-20 flex-shrink-0 overflow-hidden rounded-md border ${
                        selectedImageIndex === index
                          ? 'ring-2 ring-primary'
                          : ''
                      }`}
                    >
                      <Image
                        src={image.image_path || '/placeholder.svg'}
                        alt={`${product.name} image ${index + 1}`}
                        fill
                        className='object-cover'
                      />
                    </button>
                  ))}
                </div>
                <ScrollBar orientation='horizontal' />
              </ScrollArea>
            )}
          </div>

          {/* Product Info */}
          <div className='space-y-8'>
            <div className='space-y-2'>
              <h1 className='text-2xl font-semibold sm:text-3xl'>
                Fresh Produce
              </h1>
              <h2 className='text-lg text-muted-foreground'>{product?.name}</h2>
              <div className='flex items-center gap-2'>
                <Badge variant='secondary'>In Stock</Badge>
                {product?.category && (
                  <Badge variant='outline'>{product.category.name}</Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className='space-y-2'>
              <h3 className='text-lg font-semibold'>Description</h3>
              <p className='text-muted-foreground'>{product?.description}</p>
            </div>

            {/* Seller Information */}
            {/* {product?.user && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Seller Information</h3>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{product.user.fullname}</p>
                  {product.user.is_verified === 1 ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs font-medium">
                        Verified Seller
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center text-amber-600">
                      <XCircle className="w-4 h-4 mr-1" />
                      <span className="text-xs font-medium">
                        Unverified Seller
                      </span>
                    </div>
                  )}
                </div>
                {product.user.farm_name && (
                  <p className="text-sm text-muted-foreground">
                    {product.user.farm_name}
                  </p>
                )}
                {product.user.farm_address && (
                  <p className="text-sm text-muted-foreground">
                    {product.user.farm_address}
                  </p>
                )}
              </div>
            )} */}

            <div className='space-y-4'>
              <h2 className='text-3xl font-semibold text-primary'>
                {product?.sale_price &&
                  formatCurrency(Number.parseFloat(product.sale_price))}
              </h2>

              {/* Measurement Unit */}
              {product?.product_measurement_unit && (
                <p className='text-sm text-muted-foreground'>
                  Sold {product.product_measurement_unit}
                </p>
              )}

              {/* Minimum Order Quantity */}
              {product?.minimum_order_quantity > 1 && (
                <div className='flex items-center text-amber-600'>
                  <span className='text-sm font-medium'>
                    Minimum order: {product.minimum_order_quantity}{' '}
                    {product.minimum_order_quantity > 1 ? 'units' : 'unit'}
                  </span>
                </div>
              )}

              {/* Quantity Selector */}
              <div className='flex items-center space-x-2'>
                <span className='text-sm font-medium'>Quantity:</span>
                <div className='flex items-center'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={decrementQuantity}
                    disabled={
                      quantity <= (product?.minimum_order_quantity || 1)
                    }
                  >
                    <Minus className='w-4 h-4' />
                  </Button>
                  <Input
                    type='number'
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={product?.minimum_order_quantity || 1}
                    className='w-16 mx-1 text-center h-9'
                  />
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={incrementQuantity}
                  >
                    <Plus className='w-4 h-4' />
                  </Button>
                </div>
              </div>

              <div className='flex gap-4'>
                <Button
                  size='lg'
                  onClick={handleAddToCart}
                  variant={'primary'}
                  disabled={!product}
                >
                  <ShoppingCart className='w-5 h-5 mr-2' />
                  Add to Cart
                </Button>

                {product?.user?.id && (
                  <ChatComponent
                    chatId={product.user.id}
                    title={product.name}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <section className='mt-12 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-2xl font-semibold'>Similar Items</h2>
            <Button variant='ghost'>View all</Button>
          </div>

          <ScrollArea className='pb-4'>
            <div className='flex gap-4'>
              {products?.data?.recommended ? (
                products.data.recommended.map((product) => (
                  <div key={product.id} className='w-[250px] flex-shrink-0'>
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <div className='w-full text-center text-muted-foreground'>
                  No similar products available
                </div>
              )}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main className='container px-4 py-6 md:py-8'>
        <div className='grid gap-6 lg:gap-12 md:grid-cols-2'>
          <div className='space-y-4'>
            <Skeleton className='w-full rounded-lg aspect-square' />
            <div className='flex gap-2'>
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className='w-20 h-20 rounded-md aspect-square'
                />
              ))}
            </div>
          </div>
          <div className='space-y-8'>
            <div className='space-y-2'>
              <Skeleton className='w-2/3 h-8' />
              <Skeleton className='w-1/2 h-6' />
              <Skeleton className='w-20 h-5' />
            </div>
            <Separator />
            <div className='space-y-2'>
              <Skeleton className='w-24 h-6' />
              <Skeleton className='w-full h-24' />
            </div>
            <div className='space-y-4'>
              <Skeleton className='w-32 h-10' />
              <div className='flex gap-4'>
                <Skeleton className='h-11 w-36' />
                <Skeleton className='h-11 w-36' />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
