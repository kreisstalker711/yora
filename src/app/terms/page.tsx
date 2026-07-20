import PolicyLayout from "@/src/components/PolicyLayout";

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms of Service" updatedAt="July 2026">
      <p>
        These terms govern your use of theyora.com, operated by Yakria Private Limited
        (CIN: U72900TN2021PTC143722), Udumalpet, Tirupur, Tamil Nadu, India. By using our site or
        placing an order, you agree to these terms.
      </p>

      <h2>Products & Pricing</h2>
      <p>
        We make every effort to display accurate pricing and product information. Prices are shown in
        INR and, for convenience, an approximate USD equivalent - all payments are processed and
        charged in INR. We reserve the right to correct pricing errors and to limit order quantities.
      </p>

      <h2>Accounts</h2>
      <p>
        You are responsible for maintaining the confidentiality of your account credentials and for
        all activity under your account. Please notify us immediately of any unauthorized use.
      </p>

      <h2>Orders & Payment</h2>
      <p>
        Orders are processed once payment is successfully verified through our payment partner,
        Razorpay. An order confirmation does not guarantee product availability; in rare cases of a
        stock issue, we will contact you to offer a substitute or a full refund.
      </p>

      <h2>Subscriptions</h2>
      <p>
        &ldquo;Subscribe &amp; Save&rdquo; orders recur automatically at the frequency you select. You
        may cancel or pause a subscription at any time from your Account page, effective for the next
        scheduled cycle.
      </p>

      <h2>Coupons & Promotions</h2>
      <p>
        Coupon codes are subject to the terms stated at the time of issue (e.g. minimum order value)
        and may be withdrawn or modified at any time without notice.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this site - including text, images, and the Yora brand - is the property of
        Yakria Private Limited and may not be reproduced without permission.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the extent permitted by law, Yakria Private Limited is not liable for indirect or
        consequential damages arising from the use of our products or website.
      </p>

      <h2>Governing Law</h2>
      <p>These terms are governed by the laws of India, with courts in Tamil Nadu having jurisdiction.</p>

      <h2>Contact Us</h2>
      <p>
        Email <a className="text-primary underline" href="mailto:info@theyora.com">info@theyora.com</a> with
        any questions about these terms.
      </p>

      <p className="text-xs italic pt-6 border-t border-ink/10">
        This page is a general template and does not constitute legal advice. Please have it reviewed
        by a qualified professional before relying on it for compliance purposes.
      </p>
    </PolicyLayout>
  );
}
