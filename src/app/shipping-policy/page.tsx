import PolicyLayout from "@/src/components/PolicyLayout";

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Shipping Policy" updatedAt="July 2026">
      <p>
        We work quickly to get every order out of our Udumalpet, Tamil Nadu press unit and into your
        hands as fresh as possible.
      </p>

      <h2>Delivery Areas</h2>
      <p>
        We currently ship across India. Customers outside India can browse and view USD pricing, but
        all payments are processed and charged in INR at checkout.
      </p>

      <h2>Shipping Fees</h2>
      <ul>
        <li>Free shipping on orders over ₹999.</li>
        <li>A flat ₹99 shipping fee applies to orders below that threshold.</li>
        <li>Store pickup at our Udumalpet facility is always free.</li>
      </ul>

      <h2>Processing & Delivery Times</h2>
      <p>
        Orders are typically processed and dispatched within 1-2 business days. Delivery across India
        generally takes 3-7 business days depending on your location, handled by our logistics
        partners.
      </p>

      <h2>Order Tracking</h2>
      <p>
        Once your order ships, you can view its status from the Order History section of your
        Account page.
      </p>

      <h2>Store Pickup</h2>
      <p>
        If you select &ldquo;Pickup at Udumalpet Facility&rdquo; at checkout, we will notify you by
        email/phone once your order is ready for collection at our press unit in Udumalpet, Tirupur,
        Tamil Nadu.
      </p>

      <h2>Contact Us</h2>
      <p>
        Questions about a shipment? Email <a className="text-primary underline" href="mailto:info@theyora.com">info@theyora.com</a> with
        your order number.
      </p>

      <p className="text-xs italic pt-6 border-t border-ink/10">
        This page is a general template and does not constitute legal advice. Please have it reviewed
        by a qualified professional before relying on it for compliance purposes.
      </p>
    </PolicyLayout>
  );
}
