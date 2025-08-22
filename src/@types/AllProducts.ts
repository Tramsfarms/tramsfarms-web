export interface ProductResponse {
  status: boolean;
  message: string;
  data: {
    all_products: Product[];
    big_save: Product[];
    recommended: Product[];
  };
  last_page: number;
}

export interface Product {
  id: number;
  user_id: number;
  category_id: number;
  subcategory_id: number | null;
  name: string;
  product_code: string | null;
  weight: number | null;
  description: string;
  created_at: string;
  updated_at: string;
  sale_price: string;
  market_price: string | null;
  slug: string;
  quantity: number;
  minimum_order_quantity: number | null;
  product_measurement_unit: string;
  deleted_at: string | null;
  category: {
    id: number;
    name: string;
    slug: string;
    description: string;
    created_at: string | null;
    updated_at: string | null;
  };
  subcategory: any | null;
  images: {
    id: number;
    product_id: number;
    image_path: string;
    created_at: string;
    updated_at: string;
  }[];
  variants: any[];
  specifications: any[];
  user: {
    id: number;
    email: string;
    balance: string;
    status: string;
    google_id: string | null;
    facebook_id: string | null;
    otp: string | null;
    email_verified_at: string | null;
    fullname: string;
    user_type: string;
    address: string | null;
    phone_number: string;
    created_at: string;
    updated_at: string;
    farm_name: string | null;
    farm_image: string | null;
    farm_address: string | null;
    delivery_zone: string | null;
    is_verified: number;
    gender: string | null;
    street_no: string | null;
    street_address: string | null;
    city: string | null;
    state: string | null;
    id_number: string | null;
    govt_id_type: string | null;
    id_image: string | null;
    profile_picture: string | null;
    push_token: string | null;
    deleted_at: string | null;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type Subcategory = null;

export interface Image {
  id: number;
  product_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface Variant {
  id: number;
  product_id: number;
  variant_name: string;
  quantity: number;
  sale_date: string;
  created_at: string;
  updated_at: string;
}

export interface Specification {
  // Add fields if there are any specifications.
}

export interface Vendor {
  id: number;
  fullname: string | null;
  email: string;
  email_verified_at: string;
  country: string;
  phone_number: string;
  farm_name: string;
  delivery_zone: string;
  referral: string;
  created_at: string;
  updated_at: string;
}
