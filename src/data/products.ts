export interface ProductVariant {
  size: string;
  priceINR: number;
  oldPriceINR?: number;
  sku: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: "coconut" | "groundnut" | "sesame" | "combo";
  shortDesc: string;
  description: string;
  perfectFor: string[];
  images: string[];
  badge: string;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
}

export const PRODUCTS: Product[] = [
  {
    id: "coconut",
    slug: "extra-virgin-coconut-oil",
    title: "Extra Virgin Coconut Oil",
    category: "coconut",
    shortDesc: "Cold centrifuged pure raw coconut milk extract.",
    description:
      "Extracted from fresh raw coconut milk using dynamic centrifuge separation under room temperature. Unrefined, highly bioavailable, and rich in Lauric Acid. Perfect for skin hydration, oil pulling, and delicate raw baking.",
    perfectFor: ["Cooking", "Hair Care", "Skin Care", "Baby Massage", "Oil Pulling"],
    images: [
      "/images/real/coconut-bottle-1.png",
      "/images/real/coconut-oil-in-leaves.jpg",
      "/images/real/coconut-oil-brand-package.jpg",
      "/images/real/coconut-bottle-3.png",
    ],
    badge: "Best Seller",
    rating: 5,
    reviewCount: 12,
    variants: [
      { size: "250ml", priceINR: 250, oldPriceINR: 650, sku: "EVCO-250", inStock: true },
      { size: "500ml", priceINR: 460, oldPriceINR: 1200, sku: "EVCO-500", inStock: true },
      { size: "1L", priceINR: 850, oldPriceINR: 2200, sku: "EVCO-1000", inStock: true },
      { size: "5L", priceINR: 3800, oldPriceINR: 5000, sku: "EVCO-5000", inStock: false },
    ],
  },
  {
    id: "groundnut",
    slug: "cold-pressed-groundnut-oil",
    title: "Cold-Pressed Groundnut Oil",
    category: "groundnut",
    shortDesc: "Naturally extracted peanut oil for everyday cooking.",
    description:
      "Pressed slowly at low temperatures from premium quality sun-dried peanuts in Tirupur. The oil has a rich nutty aroma and high smoke point, ideal for healthy deep frying, sautéing, and daily cooking.",
    perfectFor: ["Deep Frying", "Everyday Cooking", "Traditional Recipes"],
    images: [
      "/images/real/groundnut-bottle-1.jpg",
      "/images/real/groundnut-benefits-post.jpg",
      "/images/real/groundnut-bottle-2-back.jpg",
      "/images/real/farmer-holding-groundnuts.jpg",
    ],
    badge: "Best Seller",
    rating: 5,
    reviewCount: 18,
    variants: [
      { size: "250ml", priceINR: 258, oldPriceINR: 399, sku: "GNO-250", inStock: true },
      { size: "500ml", priceINR: 480, oldPriceINR: 750, sku: "GNO-500", inStock: true },
      { size: "1L", priceINR: 900, oldPriceINR: 1400, sku: "GNO-1000", inStock: true },
      { size: "5L", priceINR: 4200, oldPriceINR: 6500, sku: "GNO-5000", inStock: true },
    ],
  },
  {
    id: "sesame",
    slug: "cold-pressed-sesame-oil",
    title: "Cold-Pressed Sesame Oil",
    category: "sesame",
    shortDesc: "Traditionally processed sesame oil with jaggery.",
    description:
      "Slow-pressed at low temperatures using premium sun-dried sesame seeds and dark palm jaggery (karupatti). Preserves heart-healthy lignans and vitamins with a distinct rustic depth.",
    perfectFor: ["South Indian Cooking", "Pickles", "Healthy Meals"],
    images: [
      "/images/real/sesame-bottle-1.jpg",
      "/images/real/sesame-kitchen-lifestyle.jpg",
      "/images/real/black-sesame-seeds.jpg",
      "/images/real/sesame-benefits-post.jpg",
    ],
    badge: "Sale",
    rating: 5,
    reviewCount: 14,
    variants: [
      { size: "250ml", priceINR: 160, oldPriceINR: 349, sku: "SES-250", inStock: true },
      { size: "500ml", priceINR: 295, oldPriceINR: 650, sku: "SES-500", inStock: true },
      { size: "1L", priceINR: 550, oldPriceINR: 1200, sku: "SES-1000", inStock: true },
      { size: "5L", priceINR: 2600, oldPriceINR: 5500, sku: "SES-5000", inStock: true },
    ],
  },
  {
    id: "combo",
    slug: "family-value-pack-combo",
    title: "Family Value Pack Combo",
    category: "combo",
    shortDesc: "One bottle of each: coconut, groundnut, and sesame oil.",
    description:
      "A curated trio of our three signature cold-pressed oils — coconut, groundnut, and sesame — in 250ml bottles. The easiest way to stock a naturally healthier kitchen.",
    perfectFor: ["Gifting", "New Households", "Everyday Variety"],
    images: [
      "/images/real/all-products-lineup.jpg",
      "/images/real/trio-bottles-clean.jpg",
      "/images/real/groundnut-sesame-duo.jpg",
    ],
    badge: "Value Bundle",
    rating: 5,
    reviewCount: 9,
    variants: [
      { size: "3 x 250ml", priceINR: 620, oldPriceINR: 1000, sku: "COMBO-3X250", inStock: true },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getAllSlugs(): string[] {
  return PRODUCTS.map((p) => p.slug);
}
