import PolicyLayout from "@/src/components/PolicyLayout";

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" updatedAt="July 2026">
      <p>
        Yakria Private Limited (&ldquo;Yora&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy.
        This policy explains what information we collect through theyora.com, how we use it, and the
        choices you have.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Account details you provide: name, email address, phone number, and shipping address.</li>
        <li>Order information: products purchased, order value, and delivery preferences.</li>
        <li>Payment information: processed directly by our payment partner, Razorpay. We do not store your card, UPI, or bank details on our servers.</li>
        <li>Usage information: pages visited and interactions on our site, used to improve the shopping experience.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process and deliver your orders.</li>
        <li>To send order confirmations, shipping updates, and (if you opt in) newsletters.</li>
        <li>To respond to contact, wholesale, and support inquiries.</li>
        <li>To improve our products, website, and customer experience.</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>
        We share information only with service providers who help us operate the business - our payment
        processor (Razorpay), our authentication and database provider (Firebase/Google Cloud), and
        logistics partners for delivery. We do not sell your personal information to third parties.
      </p>

      <h2>Data Security</h2>
      <p>
        We use industry-standard measures, including encrypted connections and access-controlled
        databases, to protect your information. No online service can guarantee absolute security, and
        we encourage you to use a strong, unique password for your account.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may access, update, or request deletion of your personal information at any time by
        contacting us at <a className="text-primary underline" href="mailto:info@theyora.com">info@theyora.com</a>,
        or by editing your details on your Account page.
      </p>

      <h2>Contact Us</h2>
      <p>
        Yakria Private Limited, 5/176-3, Pukkulam, Udumalpet, Tirupur, Tamil Nadu, 642154, India.
        Email: info@theyora.com
      </p>

      <p className="text-xs italic pt-6 border-t border-ink/10">
        This page is a general template and does not constitute legal advice. Please have it reviewed
        by a qualified professional before relying on it for compliance purposes.
      </p>
    </PolicyLayout>
  );
}
