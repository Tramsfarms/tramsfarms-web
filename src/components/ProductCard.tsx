import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Star, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  isLoading?: boolean;
}

export function ProductCard({ product, isLoading }: ProductCardProps) {
  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block h-full rounded-lg outline-none "
    >
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0 aspect-square">
          <div className="relative w-full h-full">
            <Image
              src={product.images[0]?.image_path || "/images/products.png"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <h3 className="mb-2 text-sm font-medium line-clamp-2 sm:text-base">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-primary">
              {formatCurrency(parseFloat(product.sale_price))}
            </p>
            {/* {product.rating && (
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{product.rating}</span>
              </div>
            )} */}
          </div>
        </CardContent>
        {/* {product.units_sold && (
          <CardFooter className="p-4 pt-0">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <ShoppingBag className="w-4 h-4" />
              <span>{product.units_sold} sold</span>
            </div>
          </CardFooter>
        )} */}
      </Card>
    </Link>
  );
}

function ProductCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="w-2/3 h-4 mb-2" />
        <Skeleton className="w-1/3 h-4" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="w-1/4 h-4" />
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
