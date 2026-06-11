export interface Review {
  id: string;
  username: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  categoryKey: 'shop_by_category' | 'gaming_accessories' | 'surplus_toys' | 'grill_essentials' | 'general_deals';
  subCategoryName?: string;
  price: number; // in Egyptian Pounds (EGP)
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  specifications: Record<string, string>;
  features: string[];
  reviews: Review[];
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: { id: string; title: string; addedAt: string }[];
}

export interface SavedAddress {
  id: string;
  label: string; // e.g., "المنزل", "العمل"
  recipientName: string;
  city: string;
  address: string;
  phone: string;
}
