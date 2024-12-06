interface ProductImage {
  id: number;
  name: string;
  imageUrl: string;
  createdate: string;
}

interface Category {
  id: number;
  name: string;
  createdate: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  salePrice: string;
  brand: string;
  stockOnHand: number;
  category: Category;
  tags: string; //consider changing to array on server side.
  createdate: string;
  productImages: ProductImage[];
}

export type { Product, Category, ProductImage };
