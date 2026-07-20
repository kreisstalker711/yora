"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { useCart } from "@/src/context/CartContext";
import { useCurrency } from "@/src/context/CurrencyContext";
import { useAuth } from "@/src/context/AuthContext";
import { useWishlist } from "@/src/context/WishlistContext";
import { formatPrice } from "@/src/lib/currency";
import { getProductBySlug, PRODUCTS } from "@/src/data/products";
import { getReviewsForProduct, submitReview, withTimeout, type Review } from "@/src/lib/firestore";

function HeartIcon({ filled = false, className = "size-5" }: { filled?: boolean; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "#7C9A6B" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={filled ? "#7C9A6B" : "currentColor"} className={`${className} transition-colors duration-300`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  );
}

function StarIcon({ filled = true, className = "size-4" }: { filled?: boolean; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "#B08D57" : "none"}
      stroke="#B08D57"
      strokeWidth={1.5}
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499c.15-.427.79-.427.94 0l1.84 5.314a.499.499 0 00.474.335h5.518c.465 0 .659.59.288.874l-4.463 3.428a.5.5 0 00-.18.555l1.68 5.15c.142.438-.363.805-.733.526l-4.463-3.428a.5.5 0 00-.58 0l-4.463 3.428c-.37.279-.875-.088-.733-.526l1.68-5.15a.5.5 0 00-.18-.555L3.38 10.02c-.371-.284-.177-.874.288-.874h5.518a.5.5 0 00.474-.335L11.48 3.5z"
      />
    </svg>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const product = getProductBySlug(slug);

  const { currency } = useCurrency();
  const { addItem } = useCart();
  const { user } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [variantIdx, setVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [subscribe, setSubscribe] = useState(false);
  const [frequency, setFrequency] = useState<"monthly" | "bimonthly">("monthly");
  const [added, setAdded] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: "", body: "" });
  const [reviewStatus, setReviewStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");

  useEffect(() => {
    if (!product) return;
    getReviewsForProduct(product.id)
      .then(setReviews)
      .finally(() => setReviewsLoading(false));
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-cream text-ink font-sans antialiased flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center py-24 gap-4 text-center">
          <h1 className="font-serif text-2xl font-semibold text-primary">Product Not Found</h1>
          <a href="/shop" className="text-xs font-bold uppercase tracking-widest text-primary hover:text-accent">
            Back to Shop &rarr;
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  const variant = product.variants[variantIdx];
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        variantSize: variant.size,
        priceINR: variant.priceINR,
        image: product.images[0],
        isSubscription: subscribe,
        subscriptionFrequency: subscribe ? frequency : undefined,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push(`/login?redirect=/shop/${slug}`);
      return;
    }
    setReviewStatus("submitting");
    try {
      await withTimeout(submitReview({
        productId: product.id,
        uid: user.uid,
        displayName: user.displayName || user.email || "Yora Customer",
        rating: reviewForm.rating,
        title: reviewForm.title,
        body: reviewForm.body,
      }));
      const updated = await withTimeout(getReviewsForProduct(product.id));
      setReviews(updated);
      setReviewForm({ rating: 5, title: "", body: "" });
      setReviewStatus("done");
      setTimeout(() => setReviewStatus("idle"), 3000);
    } catch {
      setReviewStatus("error");
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : product.rating;

  return (
    <div className="min-h-screen bg-cream text-ink font-sans antialiased overflow-x-hidden">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-20">
        {/* Breadcrumb */}
        <nav className="text-[10px] uppercase tracking-widest text-ink-muted font-semibold">
          <a href="/shop" className="hover:text-primary">Shop</a> <span className="mx-1">/</span> {product.title}
        </nav>

        {/* Product Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-3">
            <div className="card-surface bg-cream aspect-square flex items-center justify-center p-8 overflow-hidden">
              <img src={product.images[selectedImage]} alt={product.title} className="max-h-full w-auto object-contain drop-shadow-[0_20px_32px_rgba(20,50,42,0.14)]" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(idx)}
                    className={`card-surface bg-white w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2 overflow-hidden transition-all ${
                      selectedImage === idx ? "shadow-[inset_0_0_0_2px_var(--color-gold)]" : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`${product.title} thumbnail ${idx + 1}`} className="max-h-full w-auto object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-extrabold py-1 px-3.5 rounded-full uppercase tracking-wider bg-gold text-white inline-block">
                  {product.badge}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className="p-2 rounded-full border border-ink/15 hover:border-accent transition-colors"
                >
                  <HeartIcon filled={isWishlisted(product.id)} />
                </button>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-primary leading-tight">{product.title}</h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} filled={i < Math.round(avgRating)} />
                  ))}
                </div>
                <span className="text-xs text-ink-muted">
                  {avgRating.toFixed(1)} &middot; {reviews.length || product.reviewCount} reviews
                </span>
              </div>
            </div>

            <p className="text-sm text-ink-muted leading-relaxed">{product.description}</p>

            {/* Variant Selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">Select Size</span>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.sku}
                    onClick={() => setVariantIdx(idx)}
                    disabled={!v.inStock}
                    className={`px-4 py-2.5 rounded-[var(--radius-sm)] text-xs font-bold border transition-all ${
                      variantIdx === idx
                        ? "bg-primary text-white border-primary shadow-[inset_0_0_0_1px_rgba(176,141,87,0.4)]"
                        : "border-ink/15 text-ink hover:border-gold"
                    } ${!v.inStock ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    {v.size}{!v.inStock ? " (Out of Stock)" : ""}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="divider-gold"></div>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-primary">{formatPrice(variant.priceINR, currency)}</span>
                {variant.oldPriceINR && (
                  <span className="text-sm text-ink-muted line-through">{formatPrice(variant.oldPriceINR, currency)}</span>
                )}
              </div>
            </div>

            {/* Perfect For */}
            <div className="card-surface bg-white p-4 space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-widest text-primary block">Perfect For:</span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-medium text-ink-muted">
                {product.perfectFor.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            {/* Subscribe & Save */}
            <label className="card-surface flex items-start gap-3 p-4 bg-white cursor-pointer">
              <input
                type="checkbox"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-accent/40 text-primary accent-primary"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-primary">Subscribe & Save 10%</span>
                <p className="text-[11px] text-ink-muted mt-0.5">Get this delivered automatically. Cancel anytime from your account.</p>
                {subscribe && (
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as "monthly" | "bimonthly")}
                    className="mt-2 h-9 px-3 rounded-[var(--radius-sm)] border border-ink/15 bg-white text-xs"
                  >
                    <option value="monthly">Deliver Monthly</option>
                    <option value="bimonthly">Deliver Every 2 Months</option>
                  </select>
                )}
              </div>
            </label>

            {/* Qty + Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-ink/15 rounded-full overflow-hidden bg-white">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2.5 hover:bg-accent-soft font-bold text-sm">-</button>
                <span className="px-4 text-xs font-bold font-mono">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2.5 hover:bg-accent-soft font-bold text-sm">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!variant.inStock}
                className="flex-1 bg-primary hover:bg-primary-light hover:-translate-y-0.5 text-white py-3.5 rounded-[var(--radius-md)] text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-[0_2px_4px_rgba(20,50,42,0.25),0_12px_24px_-6px_rgba(20,50,42,0.35)] hover:shadow-[0_4px_8px_rgba(20,50,42,0.3),0_20px_36px_-8px_rgba(20,50,42,0.4)] disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                {added ? "Added!" : variant.inStock ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="divider-gold"></div>
            <h2 className="font-serif text-2xl font-semibold text-primary">Customer Reviews</h2>
            {reviewsLoading ? (
              <p className="text-xs text-ink-muted uppercase tracking-widest">Loading reviews...</p>
            ) : reviews.length === 0 ? (
              <p className="text-sm text-ink-muted">No reviews yet. Be the first to share your experience.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="card-surface card-surface-interactive bg-white p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon key={i} filled={i < review.rating} className="size-3.5" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-ink-muted">{review.displayName}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-primary">{review.title}</h4>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">{review.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="card-surface bg-white p-8 space-y-4">
              <h3 className="font-serif text-lg font-semibold text-primary">Write a Review</h3>
              {!user && (
                <p className="text-xs text-ink-muted">
                  <a href={`/login?redirect=/shop/${slug}`} className="text-primary font-semibold hover:text-accent">Sign in</a> to write a review.
                </p>
              )}
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button type="button" key={n} onClick={() => setReviewForm({ ...reviewForm, rating: n })}>
                      <StarIcon filled={n <= reviewForm.rating} className="size-5" />
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  required
                  placeholder="Review title"
                  value={reviewForm.title}
                  onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                  className="w-full h-11 px-4 rounded-[var(--radius-sm)] border border-ink/15 bg-white text-xs focus:border-accent focus:outline-none"
                />
                <textarea
                  required
                  rows={3}
                  placeholder="Share your experience..."
                  value={reviewForm.body}
                  onChange={(e) => setReviewForm({ ...reviewForm, body: e.target.value })}
                  className="w-full p-3 rounded-[var(--radius-sm)] border border-ink/15 bg-white text-xs focus:border-accent focus:outline-none resize-none"
                />
                <button
                  type="submit"
                  disabled={reviewStatus === "submitting"}
                  className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-[var(--radius-sm)] text-xs font-bold uppercase tracking-widest transition disabled:opacity-60"
                >
                  {reviewStatus === "submitting" ? "Submitting..." : "Submit Review"}
                </button>
                {reviewStatus === "done" && <p className="text-[11px] text-accent font-semibold text-center">Thank you for your review!</p>}
                {reviewStatus === "error" && <p className="text-[11px] text-red-600 text-center">Something went wrong.</p>}
              </form>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="space-y-8">
          <div className="divider-gold"></div>
          <h2 className="font-serif text-2xl font-semibold text-primary">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((related) => (
              <a key={related.id} href={`/shop/${related.slug}`} className="card-surface card-surface-interactive bg-white p-6 block">
                <div className="aspect-square flex items-center justify-center bg-cream rounded-[var(--radius-md)] border border-primary/5 shadow-[inset_0_2px_8px_rgba(20,50,42,0.04)] mb-4">
                  <img src={related.images[0]} alt={related.title} className="h-32 w-auto object-contain drop-shadow-[0_10px_16px_rgba(20,50,42,0.12)]" />
                </div>
                <h4 className="font-serif text-sm font-semibold text-primary">{related.title}</h4>
                <p className="text-xs text-gold font-bold mt-1">{formatPrice(related.variants[0].priceINR, currency)}</p>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
