import PolicyLayout from "@/src/components/PolicyLayout";

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="Refund & Cancellation Policy" updatedAt="July 2026">
      <p>
        Our goal is for every customer to be completely satisfied with their Yora products. If
        something isn&apos;t right, here is how we can help.
      </p>

      <h2>Damaged or Incorrect Items</h2>
      <p>
        If your order arrives damaged, leaking, or incorrect, please contact us within 48 hours of
        delivery with your order number and a photo of the item. We will arrange a free replacement
        or a full refund, whichever you prefer.
      </p>

      <h2>Quality Concerns</h2>
      <p>
        Because our oils are unrefined and unopened bottles cannot be resold once opened, we are
        unable to accept returns for change-of-mind on opened products. If you have a genuine quality
        concern with an opened product, contact us - we review these on a case-by-case basis.
      </p>

      <h2>Order Cancellation</h2>
      <p>
        Orders can be cancelled free of charge before they are dispatched from our Udumalpet facility.
        Once an order has shipped, it cannot be cancelled, but the damaged/incorrect item process above
        still applies.
      </p>

      <h2>Subscription (Subscribe &amp; Save) Cancellation</h2>
      <p>
        You can pause or cancel a recurring subscription at any time from your Account page, effective
        before the next scheduled order is placed.
      </p>

      <h2>Refund Timelines</h2>
      <p>
        Approved refunds are issued to your original payment method via Razorpay and typically reflect
        in your account within 5-7 business days, depending on your bank.
      </p>

      <h2>Contact Us</h2>
      <p>
        Email <a className="text-primary underline" href="mailto:info@theyora.com">info@theyora.com</a> with
        your order number to start a refund, replacement, or cancellation request.
      </p>

      <p className="text-xs italic pt-6 border-t border-ink/10">
        This page is a general template and does not constitute legal advice. Please have it reviewed
        by a qualified professional before relying on it for compliance purposes.
      </p>
    </PolicyLayout>
  );
}
