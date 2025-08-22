"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto prose prose-slate">
          <h1 className="mb-8 text-4xl font-bold">Terms and Conditions</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using TramsFarms, you agree to be bound by these
              Terms and Conditions. If you do not agree with any part of these
              terms, please do not use our platform.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p>
              To use certain features of TramsFarms, you must register for an
              account. You are responsible for maintaining the confidentiality
              of your account information and for all activities that occur
              under your account.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">3. Product Listings</h2>
            <p>
              Vendors must provide accurate and complete information about their
              products. All product listings must comply with our platform's
              guidelines and applicable laws.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              4. Purchases and Payments
            </h2>
            <p>
              All purchases are subject to our payment terms. We reserve the
              right to refuse service to anyone for any reason at any time.
              Prices and availability are subject to change without notice.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Shipping and Delivery
            </h2>
            <p>
              Vendors are responsible for shipping products to buyers. Delivery
              times are estimates and not guaranteed. We are not responsible for
              delays in shipping or delivery.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              6. Returns and Refunds
            </h2>
            <p>
              Returns and refunds are subject to our return policy. Buyers must
              contact vendors directly to initiate returns. We may mediate
              disputes but are not responsible for refunds.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Intellectual Property
            </h2>
            <p>
              All content on TramsFarms, including text, graphics, logos, and
              images, is the property of TramsFarms or its content creators and
              is protected by intellectual property laws.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              8. Prohibited Activities
            </h2>
            <p>
              Users may not engage in any activities that violate these terms,
              including but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Posting false or misleading information</li>
              <li>Engaging in fraudulent activities</li>
              <li>Violating intellectual property rights</li>
              <li>Harassing or abusing other users</li>
              <li>Attempting to manipulate the platform's systems</li>
            </ul>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              9. Limitation of Liability
            </h2>
            <p>
              TramsFarms is not liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the platform.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              10. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes. Continued use of the
              platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">
              11. Contact Information
            </h2>
            <p>
              For questions about these Terms and Conditions, please contact us
              at:
            </p>
            <p className="mt-2">
              Email: support@tramsfarms.com
              <br />
              Address: [Your Business Address]
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
